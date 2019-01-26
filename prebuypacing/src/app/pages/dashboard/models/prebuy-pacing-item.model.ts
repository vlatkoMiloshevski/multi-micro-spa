export class PrebuyPacingItem {
  constructor(
    public id: number,
    public dueDate: string | Date,
    public client: string,
    public cpe: string,
    public market: string,
    public buyer: string,
    public rfp: string,
    public nego: string,
    public budget: number,
    public lt70: any,
    public gt70lt90: any,
    public gt90: any) {}
}
