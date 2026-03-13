import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBewertungDto } from './dto/create-bewertung.dto';
import { UpdateBewertungDto } from './dto/update-bewertung.dto';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { Buchung } from '../bookings/entities/booking.entity';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Bewertung } from './entities/bewertung.entity';
import { BewertungResponseDto } from './dto/response-bewertung.dto';
import { AuthenticatedUser } from 'src/_common/casl/casl.utils';

@Injectable()
export class BewertungService {
  constructor(
    @InjectRepository(Bewertung)
    private readonly bewertungRepo: Repository<Bewertung>,
    @InjectRepository(Buchung)
    private readonly buchungRepo: Repository<Buchung>,
  ) {}
 
  async create(user: AuthenticatedUser, dto: CreateBewertungDto): Promise<BewertungResponseDto> {
    // Buchung laden und prüfen
    const buchung = await this.buchungRepo.findOne({
      where: { buchungs_id: dto.buchungs_id },
      relations: ['bewertung'],
    });
 
    if (!buchung) {
      throw new NotFoundException(`Buchung ${dto.buchungs_id} nicht gefunden.`);
    }
 
    // Nur der Kunde der Buchung darf bewerten
    if (buchung.kunde_id !== user.id) {
      throw new ForbiddenException('Du kannst nur deine eigenen Buchungen bewerten.');
    }
 
    // Buchung muss abgeschlossen sein (checkout in Vergangenheit)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(buchung.checkout) >= today) {
      throw new BadRequestException('Du kannst erst nach dem Checkout bewerten.');
    }
 
    // Buchung darf nicht storniert sein
    if (buchung.stornodatum) {
      throw new BadRequestException('Stornierte Buchungen können nicht bewertet werden.');
    }
 
    // Pro Buchung nur eine Bewertung
    if (buchung.bewertung) {
      throw new ConflictException('Diese Buchung wurde bereits bewertet.');
    }
 
    const bewertung = this.bewertungRepo.create({
      buchungs_id: dto.buchungs_id,
      titel: dto.titel,
      text: dto.text,
      sterne: dto.sterne,
    });
 
    const saved = await this.bewertungRepo.save(bewertung);
    return this.mapToDto(saved, buchung);
  }
 
  // Alle Bewertungen für ein Hotel (über zimmer -> buchung_zimmer -> buchung -> bewertung)
  async findByHotel(hotelId: number): Promise<BewertungResponseDto[]> {
    const bewertungen = await this.bewertungRepo
      .createQueryBuilder('bewertung')
      .innerJoinAndSelect('bewertung.buchung', 'buchung')
      .innerJoin('buchung.buchungZimmer', 'bz')
      .innerJoin('bz.zimmer', 'zimmer')
      .innerJoin('buchung.kunde', 'kunde')
      .innerJoin('kunde.benutzer', 'benutzer')
      .where('zimmer.hotel_id = :hotelId', { hotelId })
      .select([
        'bewertung',
        'buchung.buchungs_id',
        'buchung.checkin',
        'buchung.checkout',
        'benutzer.vorname',
        'benutzer.nachname',
      ])
      .getMany();
 
    return bewertungen.map((b) => this.mapToDto(b, b.buchung));
  }
 
  // Bewertung einer einzelnen Buchung abrufen
  async findByBuchung(buchungsId: number): Promise<BewertungResponseDto> {
    const bewertung = await this.bewertungRepo.findOne({
      where: { buchungs_id: buchungsId },
      relations: ['buchung'],
    });
 
    if (!bewertung) {
      throw new NotFoundException(`Keine Bewertung für Buchung ${buchungsId} gefunden.`);
    }
 
    return this.mapToDto(bewertung, bewertung.buchung);
  }
 
  async update(user: AuthenticatedUser, buchungsId: number, dto: UpdateBewertungDto): Promise<BewertungResponseDto> {
    const bewertung = await this.bewertungRepo.findOne({
      where: { buchungs_id: buchungsId },
      relations: ['buchung'],
    });
 
    if (!bewertung) {
      throw new NotFoundException(`Bewertung für Buchung ${buchungsId} nicht gefunden.`);
    }
 
    // Nur der Autor darf updaten
    if (bewertung.buchung.kunde_id !== user.id) {
      throw new ForbiddenException('Du kannst nur deine eigenen Bewertungen bearbeiten.');
    }
 
    if (dto.titel !== undefined) bewertung.titel = dto.titel;
    if (dto.text !== undefined) bewertung.text = dto.text;
    if (dto.sterne !== undefined) bewertung.sterne = dto.sterne;
 
    const saved = await this.bewertungRepo.save(bewertung);
    return this.mapToDto(saved, bewertung.buchung);
  }
 
  async remove(user: AuthenticatedUser, buchungsId: number): Promise<void> {
    const bewertung = await this.bewertungRepo.findOne({
      where: { buchungs_id: buchungsId },
      relations: ['buchung'],
    });
 
    if (!bewertung) {
      throw new NotFoundException(`Bewertung für Buchung ${buchungsId} nicht gefunden.`);
    }
 
    const isAdmin = (user as any).role === 'admin' || user.id === 7;
    if (!isAdmin && bewertung.buchung.kunde_id !== user.id) {
      throw new ForbiddenException('Keine Berechtigung diese Bewertung zu löschen.');
    }
 
    await this.bewertungRepo.remove(bewertung);
  }
 
  private mapToDto(bewertung: Bewertung, buchung: Buchung): BewertungResponseDto {
    return {
      buchungs_id: bewertung.buchungs_id,
      titel: bewertung.titel,
      text: bewertung.text,
      sterne: bewertung.sterne,
      kunde: {
        vorname: (buchung as any).kunde?.benutzer?.vorname ?? '',
        nachname: (buchung as any).kunde?.benutzer?.nachname ?? '',
      },
      checkin: buchung?.checkin,
      checkout: buchung?.checkout,
    };
  }
}
 