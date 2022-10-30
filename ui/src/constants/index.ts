import BancaDati from "../assets/banca_dati.json";
import { DataBank, Question } from "../models";

export const Data: DataBank = BancaDati || null;
export const Sections: Array<string> = Data?.map((section) => section?.section) || [];
