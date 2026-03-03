import React, { useState } from 'react';
import { Users, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface GuestSearchProps {
  adults: number;
  setAdults: (val: number) => void;
  children: number;
  setChildren: (val: number) => void;
  rooms: number;
  setRooms: (val: number) => void;
}

export const GuestSearch = ({ adults, setAdults, children, setChildren, rooms, setRooms }: GuestSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const totalGuests = adults + children;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center flex-1 px-8 py-3 hover:bg-slate-50 rounded-full cursor-pointer transition w-full">
          <Users className="text-blue-600 mr-3 h-5 w-5" />
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-bold uppercase text-slate-400">Gäste & Zimmer</span>
            <span className="text-sm text-slate-600 truncate">
              {totalGuests} {totalGuests === 1 ? 'Gast' : 'Gäste'}, {rooms} {rooms === 1 ? 'Zimmer' : 'Zimmer'}
            </span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] p-10 bg-white rounded-[32px] border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Wer kommt mit?</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-8 mt-8">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-base font-bold text-slate-900">Erwachsene</span>
              <span className="text-xs text-slate-500 font-medium">Alter 16+</span>
            </div>
            <div className="flex items-center gap-5">
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-full border-slate-200" onClick={() => setAdults(Math.max(1, adults - 1))}>
                <Minus className="h-4 w-4 text-slate-600" />
              </Button>
              <span className="text-lg font-bold w-4 text-center">{adults}</span>
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-full border-slate-200" onClick={() => setAdults(adults + 1)}>
                <Plus className="h-4 w-4 text-slate-600" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-base font-bold text-slate-900">Kinder</span>
              <span className="text-xs text-slate-500 font-medium">Alter 2-15</span>
            </div>
            <div className="flex items-center gap-5">
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-full border-slate-200" onClick={() => setChildren(Math.max(0, children - 1))}>
                <Minus className="h-4 w-4 text-slate-600" />
              </Button>
              <span className="text-lg font-bold w-4 text-center">{children}</span>
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-full border-slate-200" onClick={() => setChildren(children + 1)}>
                <Plus className="h-4 w-4 text-slate-600" />
              </Button>
            </div>
          </div>
          <div className="h-px bg-slate-100 w-full" />
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-base font-bold text-slate-900">Zimmer</span>
            </div>
            <div className="flex items-center gap-5">
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-full border-slate-200" onClick={() => setRooms(Math.max(1, rooms - 1))}>
                <Minus className="h-4 w-4 text-slate-600" />
              </Button>
              <span className="text-lg font-bold w-4 text-center">{rooms}</span>
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-full border-slate-200" onClick={() => setRooms(rooms + 1)}>
                <Plus className="h-4 w-4 text-slate-600" />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex justify-end w-full mt-10">
          <Button onClick={() => setIsOpen(false)} className="bg-slate-900 text-white hover:bg-slate-800 rounded-full px-10 h-14 text-base font-bold w-full shadow-lg">
            Übernehmen
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};