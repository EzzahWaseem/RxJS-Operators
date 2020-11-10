import { Component, OnInit } from '@angular/core';
import { of, from } from 'rxjs'; 
import { map, delay, switchAll, switchMap ,mergeAll ,mergeMap, concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'RxJS-practice';

  /**
   *
   */
  constructor() {
    // console.log("TEST");
  }

  ngOnInit(){
    // console.log('Hi')
    const getData = (param) => {
      return of(`retrieved new data with param ${param}`).pipe(
        delay(1000)
      )
    }
    const getMapDiffData = (param) => {
      const delayTime = Math.floor(Math.random() * 10000) + 1;
      return of(`retrieved new data with params: ${param} and delay: ${delayTime}`).pipe(
        delay(delayTime)
      )
    }

    // using a regular map
    from([1,2,3,4]).pipe(
      map(param => getData(param))
    ).subscribe(val => val.subscribe(data => console.log('Map  '  , data)));
    
    // using map and switchAll
    from([1,2,3,4]).pipe(
      map(param => getData(param)),
      switchAll()
    ).subscribe(val => console.log('Map & SwitchAll  '   , val));
    
    // using switchMap
    from([1,2,3,4]).pipe(
      switchMap(param => getData(param))
    ).subscribe(val => console.log( 'SwitchMap  ' , val ));
   
  
//using map and mergeAll
from([1,2,3,4]).pipe(
  map(param => getData(param)),
  mergeAll()
).subscribe(val => console.log('Map & MergeAll  '  ,val));

// using mergeMap
from([1,2,3,4]).pipe(
  mergeMap(param => getData(param))
).subscribe(val => console.log('MergeMap  '  ,val));

//Difference among concat Map , merge Map and switch Map


  // using a regular map
  from([1,2,3,4]).pipe(
    map(param => getMapDiffData(param))
  ).subscribe(val => val.subscribe(data => console.log('map:', data)));
  
  // using mergeMap
  from([1, 2, 3 ,4]).pipe(
    mergeMap(param => getMapDiffData(param))
  ).subscribe(val => console.log('mergeMap:', val));
  // using concatMap
  from([1, 2, 3 ,4]).pipe(
    concatMap(param => getMapDiffData(param))
  ).subscribe(val => console.log('concatMap  ', val));
}


}

