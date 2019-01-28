export class Movie {
    constructor(id, name, checked, coverUrl) {
        this.id = id;
        this.name = name;
        this.checked = checked;
        this.coverUrl = coverUrl;
    }
    id: Number;
    name: string;
    checked: boolean;
    coverUrl: string;
}