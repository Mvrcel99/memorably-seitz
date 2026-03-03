import React, { useState } from 'react';
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DateSearchProps {
  date: DateRange | undefined;
  onSelect: (range: DateRange | undefined) => void;
}

export const DateSearch = ({ date, onSelect }: DateSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center flex-1 px-8 py-3 hover:bg-slate-50 rounded-full cursor-pointer transition w-full">
          <CalendarIcon className="text-blue-600 mr-3 h-5 w-5" />
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-bold uppercase text-slate-400">Zeitraum</span>
            <span className="text-sm text-slate-600 whitespace-nowrap">
              {date?.from ? (
                date.to ? <>{format(date.from, "dd.MM.")} - {format(date.to, "dd.MM.yy")}</> : format(date.from, "dd.MM.yyyy")
              ) : "Datum wählen"}
            </span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[750px] p-8 bg-white rounded-[32px] border-none shadow-2xl">
        <div className="flex flex-col items-center">
          <div className="mb-6 text-center">
            <DialogTitle className="text-2xl font-bold">Zeitraum wählen</DialogTitle>
          </div>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onSelect}
            numberOfMonths={2}
            locale={de}
          />
          <div className="flex justify-end w-full mt-8 pt-6 border-t border-slate-100">
            <Button 
              onClick={() => setIsOpen(false)}
              className="bg-slate-900 text-white hover:bg-slate-800 rounded-full px-10 h-12 text-sm font-bold"
            >
              Übernehmen
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};