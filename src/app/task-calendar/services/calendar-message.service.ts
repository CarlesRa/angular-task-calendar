import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Work} from "../models/work.model";

@Injectable()
export class CalendarMessageService {
  works$!: BehaviorSubject<Work[]>;
}
