import { Coordinate } from "./coordinate";

export interface Activity {
  id: string;
  date: string;
  distance: number;
  duration: number;
  coordinates: Coordinate[];
}