import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie-model';
import { Observable, of } from 'rxjs';
import { ErrorService } from './error-handler.service';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    movieList: Array<Movie>;

    constructor(
        private http: HttpClient,
        private errorService: ErrorService
    ) {
        this.movieList = [
            {
                "id": 1,
                "name": "House Of Cards",
                "checked": false,
                "coverUrl": "https://vignette.wikia.nocookie.net/house-of-cards/images/b/b6/House_of_Cards_main_characters.jpg/revision/latest/scale-to-width-down/640?cb=20130818190052"
            },
            {
                "id": 2,
                "name": "Breaking Bad",
                "checked": false,
                "coverUrl": "https://images7.alphacoders.com/617/617964.jpg"
            },
            {
                "id": 3,
                "name": "Black Mirror",
                "checked": false,
                "coverUrl": "https://i0.wp.com/www.politeonsociety.com/wp-content/uploads/2016/10/14670838_10210376146376113_5805593373952688605_n.jpg"
            },
            {
                "id": 4,
                "name": "The Lord Of The Rings",
                "checked": false,
                "coverUrl": "https://images-na.ssl-images-amazon.com/images/I/51-jt7ZQI%2BL._SX425_.jpg"
            },
            {
                "id": 5,
                "name": "Hobbit",
                "checked": false,
                "coverUrl": "https://images-na.ssl-images-amazon.com/images/I/51gbyRZXEVL.jpg"
            },
            {
                "id": 6,
                "name": "Game Of Thrones",
                "checked": false,
                "coverUrl": "https://amp.businessinsider.com/images/56cdf3c86e97c61a008b9659-750-563.jpg"
            }
        ];
    }

    addNewMovie(movie: Movie): any {
        return of(movie)
        .pipe(catchError(this.errorService.errorHandler.bind(this)));
    }

    getInitMovies(): Observable<any> {
        return of(this.movieList)
        .pipe(catchError(this.errorService.errorHandler.bind(this)));
    }
}
