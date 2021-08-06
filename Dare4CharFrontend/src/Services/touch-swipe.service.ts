import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class TouchSwipeService {
    constructor() {}
    private coordinate!: [number, number];
    private prevtime!: number;

    getSwipe(when: string, e: TouchEvent,currIndex:number,maxIndex:number,isStatus?:boolean) {
        const curr_coordinate: [number, number] = [
            e.changedTouches[0].clientX,
            e.changedTouches[0].clientY,
        ];
        const curr_time = new Date().getTime();
        if (when === 'start') {
            this.coordinate = curr_coordinate;
            this.prevtime = curr_time;
        } else if (when === 'end') {
            const dirrection: [number, number] = [
                curr_coordinate[0] - this.coordinate[0],
                curr_coordinate[1] - this.coordinate[1],
            ];
            const timeDiff = curr_time - this.prevtime;
            if (
                timeDiff < 1000 &&
                Math.abs(dirrection[0]) > 30 &&
                Math.abs(dirrection[0]) > Math.abs(dirrection[1] * 3)
            ) {
                return dirrection[0] < 0 ? this.moveNext(currIndex,maxIndex) : this.movePrev(currIndex) ;
            }else if(isStatus && timeDiff < 1000 && Math.abs(dirrection[1]) > 30 &&
            Math.abs(dirrection[1]) > Math.abs(dirrection[0] * 3)){
                let val= dirrection[1] < 0 ? 'swipe up': 'swipe down' ;
                console.log(val);
                
            }
        }
        return currIndex;
    }
    getMouseSwipe(when: string, e: MouseEvent,currIndex:number,maxIndex:number,isStatus?:boolean) {
        const curr_coordinate: [number, number] = [e.clientX, e.clientY];
        const curr_time = new Date().getTime();
        if (when === 'start') {
            this.coordinate = curr_coordinate;
            this.prevtime = curr_time;
        } else if (when === 'end') {
            const dirrection: [number, number] = [
                curr_coordinate[0] - this.coordinate[0],
                curr_coordinate[1] - this.coordinate[1],
            ];
            const timeDiff = curr_time - this.prevtime;
            if (
                timeDiff < 1000 &&
                Math.abs(dirrection[0]) > 30 &&
                Math.abs(dirrection[0]) > Math.abs(dirrection[1] * 3)
            ) {
                return dirrection[0] < 0 ? this.moveNext(currIndex,maxIndex) : this.movePrev(currIndex) ;
            }else if(isStatus && timeDiff < 1000 && Math.abs(dirrection[1]) > 30 &&
                Math.abs(dirrection[1]) > Math.abs(dirrection[0] * 3)){
                    let val= dirrection[1] < 0 ? 'swipe up': 'swipe down' ;
                    console.log(val);
                    
                }
        }
        return currIndex;
    }
    moveNext(currIndex:number,maxIndex:number){
        return currIndex<maxIndex-1 ? currIndex+1:currIndex
    }
    movePrev(currIndex:number){
        return currIndex==0 ? currIndex:currIndex-1
    }
}
