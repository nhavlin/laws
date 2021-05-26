import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Ilaw } from '../01-domain/Ilaw.interface';

@Injectable({
  providedIn: 'root'
})
export class LawViewService {

  constructor() { }

  
  flatme(data: Ilaw[]): TreeNode[] {
    // console.error('flatme', data);
    let result: TreeNode[] = [];
    data.forEach(single => {
      let node: TreeNode = {
        label: single.LawName,
        expanded: true,
        styleClass:"law",
        type:"law",
        data: {
          LawUri: single.LawUri,
          componentNum: ''
        },
        children: single.Components.map(comp => {
          return <TreeNode>{
            label: comp.eId,
            expanded: true,
            styleClass:"component",
        type:"component",

            data: {
              LawUri: '',
              componentNum: comp.componentNum
            },
            children: comp.refTo.map(ref => {
              return <TreeNode>{
                label: ref.refTo_eId,
                expanded: true,
            styleClass:"refTo",
        type:"refTo",

              };
            })
          };
        })
      };

      result.push(node);
    });
    // console.log('result', result);
    return result;
  }
}
