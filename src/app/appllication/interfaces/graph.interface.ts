export interface IGraph {

  pieChart?: [{
    name: string,
    value: string,
  }];
  pieGrid?: [{
    name: string,
    value: string,
  }];
  chartBar?: [{
    name: string,
    series: [{ name: string, value: string, }],
  }];


}
