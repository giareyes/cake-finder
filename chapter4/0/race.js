var possible_cake = new Float32Array([ 57, 0, 15, 58, 0, 15.5, 58, 0, 14.5, 95, 0, 83, 96,
    0, 83.5, 96, 0, 82.5, -70, 0, -63, -69, 0, -62.5, -69, 0, -63.5, -85, 0, 93,
    -84, 0, 93.5, -84, 0, 92.5, -67, 0, -19, -66, 0, -18.5, -66, 0, -19.5, 50, 0, -18,
    51, 0, -18.5, 51, 0, -17.5]);
var this_cake = Math.floor(Math.random()*6);

NVMC.DefaultRace = {
    startPosition : [ 3.71,0,61.19 ],
    
    enemyStart : [ 3,0,66 ],

    photoPosition : [ -55, 0, -80 ],

    observerPosition : [ -9, 20, -79 ],

    bbox : [ -100, 0, -100, 100, 10, 100 ],

  track : {
    leftCurb : [
      -90, 0, -85,
      -90, 0, 75,
      80, 0, 75,
      80, 0, -85,
      20, 0, -85,
      20, 0, 25,
      -45, 0, 25,
      -45, 0, 0,
      5, 0, 0,
      5, 0, -85,
      -35, 0, -85,
      -35, 0, -40,
      -50, 0, -40,
      -50, 0, -85,
      -90, 0, -85,
    ],
    rightCurb : [
      -75, 0, -70,
      -75, 0, 60,
      65, 0, 60,
      65, 0, -70,
      35, 0, -70,
      35, 0, 40,
      -60, 0, 40,
      -60, 0, -15,
      -10, 0, -15,
      -10, 0, -70,
      -20, 0, -70,
      -20, 0, -25,
      -65, 0, -25,
      -65, 0, -70,
      -75, 0, -70,
    ],
  },
  tunnels : [
    {
      height : 0.5,
      // position: [
      //     -85, 0, 93,
      //     -84, 0, 93.5,
      //     -84, 0, 92.5,
      // ]
      position: [
         possible_cake[this_cake*9], possible_cake[this_cake*9 + 1], possible_cake[this_cake*9 + 2],
          possible_cake[this_cake*9 + 3], possible_cake[this_cake*9 + 4], possible_cake[this_cake*9 + 5],
          possible_cake[this_cake*9 + 6], possible_cake[this_cake*9 + 7], possible_cake[this_cake*9 + 8]
      ]
  }
],
  lamps : [
    {
      position : [ -37.875, 0, 47.3438],
      height   : 4
    },

    {
      position : [ -0.5, 0, 50.9375],
      height   : 4
    },

    {
      position : [ -25.875, 0, 53.5938],
      height   : 4
    },

    {
      position : [ 10.25, 0, 55.7812],
      height   : 4
    },

    {
      position : [ -14.375, 0, 59.6875],
      height   : 4
    },

    {
      position : [ -5.375, 0, 64.0625],
      height   : 4
    },

    {
      position : [ 7.125, 0, 69.0625],
      height   : 4
    }
  ],

  trees : [
    {
      position : [ -28, 0, -22],
      height   : 10
    },
    {
      position : [ 10, 0, -50],
      height   : 10
    },
    {
      position : [ 8, 0, -55],
      height   : 10
    },
    {
      position : [ 16, 0, -56],
      height   : 10
    },
    {
      position : [ 12, 0, -59],
      height   : 10
    },
    {
      position : [ 15, 0, -63],
      height   : 10
    },
    {
      position : [ 8, 0, -63],
      height   : 10
    },
    {
      position : [ 11, 0, -68],
      height   : 10
    },
    {
      position : [ 16, 0, -68],
      height   : 10
    },
    {
      position : [ 7, 0, -71],
      height   : 10
    },
    {
      position : [ 12, 0, -74],
      height   : 10
    },
    {
      position : [ 17, 0, -74],
      height   : 10
    },
    {
      position : [ 17, 0, -74],
      height   : 10
    },
    {
      position : [ 8, 0, -77],
      height   : 10
    },
    {
      position : [ 13, 0, -80],
      height   : 10
    },
    {
      position : [ 17, 0, -83],
      height   : 10
    },
    {
      position : [ 8, 0, -83],
      height   : 10
    },
    {
      position : [ -95, 0, 94],
      height   : 10
    },
    {
      position : [ -92, 0, 84],
      height   : 10
    },
    {
      position : [ -93, 0, 77],
      height   : 10
    },
    {
      position : [ -97, 0, 72],
      height   : 10
    },
    {
      position : [ -95, 0, 64],
      height   : 10
    },
    {
      position : [ -93, 0, 56],
      height   : 10
    },
    {
      position : [ -97, 0, 52],
      height   : 10
    },
    {
      position : [ -94, 0, 46],
      height   : 10
    },
    {
      position : [ -96, 0, 38],
      height   : 10
    },
    {
      position : [ -93, 0, 30],
      height   : 10
    },
    {
      position : [ -97, 0, 25],
      height   : 10
    },
    {
      position : [ -93, 0, 20],
      height   : 10
    },
    {
      position : [ -95, 0, 12],
      height   : 10
    },
    {
      position : [ -97, 0, 2],
      height   : 10
    },
    {
      position : [ -93, 0, 5],
      height   : 10
    },
    {
      position : [ -95, 0, -5],
      height   : 10
    },
    {
      position : [ -93, 0, -11],
      height   : 10
    },
    {
      position : [ -96, 0, -17],
      height   : 10
    },
    {
      position : [ -92, 0, -24],
      height   : 10
    },
    {
      position : [ -97, 0, -27],
      height   : 10
    },
    {
      position : [ -97, 0, -36],
      height   : 10
    },
    {
      position : [ -93, 0, -42],
      height   : 10
    },
    {
      position : [ -93, 0, -52],
      height   : 10
    },
    {
      position : [ -96, 0, -57],
      height   : 10
    },
    {
      position : [ -96, 0, -67],
      height   : 10
    },
    {
      position : [ -93, 0, -76],
      height   : 10
    },
    {
      position : [ -93, 0, -90],
      height   : 10
    },
    {
      position : [ -87, 0, -94],
      height   : 10
    },
    {
      position : [ -85, 0, -88],
      height   : 10
    },
    {
      position : [ -80, 0, -97],
      height   : 10
    },
    {
      position : [ -75, 0, -93],
      height   : 10
    },
    {
      position : [ -70, 0, -88],
      height   : 10
    },
    {
      position : [ -65, 0, -93],
      height   : 10
    },
    {
      position : [ -62, 0, -88],
      height   : 10
    },
    {
      position : [ -60, 0, -97],
      height   : 10
    },
    {
      position : [ -55, 0, -91],
      height   : 10
    },
    {
      position : [ -50, 0, -98],
      height   : 10
    },
    {
      position : [ -50, 0, -88],
      height   : 10
    },
    {
      position : [ -45, 0, -93],
      height   : 10
    },
    {
      position : [ -40, 0, -97],
      height   : 10
    },
    {
      position : [ -40, 0, -86],
      height   : 10
    },
    {
      position : [ -35, 0, -90],
      height   : 10
    },
    {
      position : [ -30, 0, -94],
      height   : 10
    },
    {
      position : [ -25, 0, -97],
      height   : 10
    },
    {
      position : [ -23, 0, -88],
      height   : 10
    },
    {
      position : [ -19, 0, -93],
      height   : 10
    },
    {
      position : [ -13, 0, -97],
      height   : 10
    },
    {
      position : [ -13, 0, -88],
      height   : 10
    },
    {
      position : [ -4, 0, -93],
      height   : 10
    },
    {
      position : [ 3, 0, -97],
      height   : 10
    },
    {
      position : [ 3, 0, -88],
      height   : 10
    },
    {
      position : [ 8, 0, -92],
      height   : 10
    },
    {
      position : [ 14, 0, -97],
      height   : 10
    },
    {
      position : [ 12, 0, -88],
      height   : 10
    },
    {
      position : [ 18, 0, -90],
      height   : 10
    },
    {
      position : [ 24, 0, -97],
      height   : 10
    },
    {
      position : [ 24, 0, -88],
      height   : 10
    },
    {
      position : [ 29, 0, -92],
      height   : 10
    },
    {
      position : [ 35, 0, -97],
      height   : 10
    },
    {
      position : [ 35, 0, -88],
      height   : 10
    },
    {
      position : [ 40, 0, -92],
      height   : 10
    },
    {
      position : [ 45, 0, -97],
      height   : 10
    },
    {
      position : [ 48, 0, -88],
      height   : 10
    },
    {
      position : [ 53, 0, -95],
      height   : 10
    },
    {
      position : [ 59, 0, -88],
      height   : 10
    },
    {
      position : [ 66, 0, -96],
      height   : 10
    },
    {
      position : [ 72, 0, -88],
      height   : 10
    },
    {
      position : [ 78, 0, -92],
      height   : 10
    },
    {
      position : [ 82, 0, -97],
      height   : 10
    },
    {
      position : [ 85, 0, -88],
      height   : 10
    },
    {
      position : [ 90, 0, -92],
      height   : 10
    },
    {
      position : [ 95, 0, -97],
      height   : 10
    },
    {
      position : [ 95, 0, -86],
      height   : 10
    },
    {
      position : [ 55, 0, -25],
      height   : 10
    },
    {
      position : [ 57, 0, -47],
      height   : 10
    },
    {
      position : [ 52, 0, -64],
      height   : 10
    },
    {
      position : [45, 0, 35],
      height   : 10
    },
    {
      position : [40, 0, 40],
      height   : 10
    },
    {
      position : [40, 0, 50],
      height   : 10
    },
    {
      position : [47, 0, 45],
      height   : 10
    },
    {
      position : [-43, 0, -60],
      height   : 100
    },
    {
      position : [ -85, 0, 97],
      height   : 10
    },
    {
      position : [ -75, 0, 93],
      height   : 10
    },
    {
      position : [ -65, 0, 93],
      height   : 10
    },
    {
      position : [ -55, 0, 96],
      height   : 10
    },
    {
      position : [ -45, 0, 96],
      height   : 10
    },
    {
      position : [ -37, 0, 97],
      height   : 10
    },
    {
      position : [ -27, 0, 95],
      height   : 10
    },
    {
      position : [ -20, 0, 94],
      height   : 10
    },
    {
      position : [ -11, 0, 96],
      height   : 10
    },
    {
      position : [ -2, 0, 97],
      height   : 10
    },
    {
      position : [ 8, 0, 95],
      height   : 10
    },
    {
      position : [ 24, 0, 96],
      height   : 10
    },
    {
      position : [ 37, 0, 92],
      height   : 10
    },
    {
      position : [ 42, 0, 94],
      height   : 10
    },
    {
      position : [ 52, 0, 97],
      height   : 10
    },
    {
      position : [ 66, 0, 93],
      height   : 10
    },
    {
      position : [ 78, 0, 95],
      height   : 10
    },
    {
      position : [ 90, 0, 93],
      height   : 10
    },
    {
      position : [ 95, 0, 80],
      height   : 10
    },
    {
      position : [ 97, 0, 68],
      height   : 10
    },
    {
      position : [ 94, 0, 60],
      height   : 10
    },
    {
      position : [ 95, 0, 52],
      height   : 10
    },
    {
      position : [ 97, 0, 40],
      height   : 10
    },
    {
      position : [ 95, 0, 32],
      height   : 10
    },
    {
      position : [ 96, 0, 23],
      height   : 10
    },
    {
      position : [ 95, 0, 11],
      height   : 10
    },
    {
      position : [ 96, 0, 2],
      height   : 10
    },
    {
      position : [ 90, 0, -4],
      height   : 10
    },
    {
      position : [ 95, 0, -22],
      height   : 10
    },
    {
      position : [ 97, 0, -34],
      height   : 10
    },
    {
      position : [ 95, 0, -46],
      height   : 10
    },
    {
      position : [ 96, 0, -53],
      height   : 10
    },
    {
      position : [ 92, 0, -64],
      height   : 10
    },
    {
      position : [ 95, 0, -74],
      height   : 10
    },
    {
      position : [ -32, 0, -18],
      height   : 10
    },
    {
      position : [ -44, 0, -18],
      height   : 10
    },
    {
      position : [ -42, 0, -23],
      height   : 10
    },
    {
      position : [ -50, 0, -18],
      height   : 10
    },
    {
      position : [ -48, 0, -23],
      height   : 10
    },
    {
      position : [ -55, 0, -21],
      height   : 10
    },
    {
      position : [ -60, 0, -19],
      height   : 10
    },
    {
      position : [ -65, 0, -22],
      height   : 10
    },
    {
      position : [ -68, 0, -33],
      height   : 10
    },
    {
      position : [ -72, 0, -36],
      height   : 10
    },
    {
      position : [ -68, 0, -42],
      height   : 10
    },
    {
      position : [ -71, 0, -47],
      height   : 10
    },
    {
      position : [ -67, 0, -50],
      height   : 10
    },
    {
      position : [ -69, 0, -55],
      height   : 10
    },
    {
      position : [ -73, 0, -52],
      height   : 10
    },
    {
      position : [ -72, 0, -60],
      height   : 10
    },
    {
      position : [ -67, 0, -60],
      height   : 10
    },
    {
      position : [ -70, 0, -65],
      height   : 10
    },
    {
      position : [ -72.5, 0, -42],
      height   : 10
    },
    {
      position : [ -70, 0, -20],
      height   : 10
    },
    {
      position : [ -70, 0, -27],
      height   : 10
    },
    {
      position : [ -20, 0, -18],
      height   : 10
    },
    {
      position : [ -17, 0, -35],
      height   : 10
    },
    {
      position : [ -14, 0, -40],
      height   : 10
    },
    {
      position : [ -17, 0, -44],
      height   : 10
    },
    {
      position : [ -13, 0, -50],
      height   : 10
    },
    {
      position : [ -17, 0, -53],
      height   : 10
    },
    {
      position : [ -15, 0, -59],
      height   : 10
    },
    {
      position : [ -13, 0, -64],
      height   : 10
    },
    {
      position : [ -17, 0, -67],
      height   : 10
    },
    {
      position : [ -13, 0, -21],
      height   : 10
    },
    {
      position : [ -13, 0, -30],
      height   : 10
    },
    {
      position : [ -17, 0, -26],
      height   : 10
    },
    {
      position : [ 18, 0, -21],
      height   : 10
    },
    {
      position : [ 12, 0, -20],
      height   : 10
    },
    {
      position : [ -37, 0, -20],
      height   : 10
    },
    {
      position : [ 96, 0, -14],
      height   : 10
    },
    {
      position : [ 11, 0, -12],
      height   : 10
    },
    {
      position : [ 18, 0, -4],
      height   : 10
    },
    {
      position : [ 54, 0, -3],
      height   : 10
    },
    {
      position : [ 53, 0, 12],
      height   : 10
    },
    {
      position : [ -25, 0, 14],
      height   : 10
    },
    {
      position : [ 53, 0, 16],
      height   : 10
    },
    {
      position : [ -33, 0, 8],
      height   : 10
    },
    {
      position : [ -37, 0, 17],
      height   : 10
    },
    {
      position : [ -38, 0, 5],
      height   : 10
    },
    {
      position : [ -42, 0, 14],
      height   : 10
    },
    {
      position : [ -13, 0, 14],
      height   : 10
    },
    {
      position : [ 15, 0, 14],
      height   : 10
    },
    {
      position : [ 10, 0, 10],
      height   : 10
    },
    {
      position : [ 10, 0, 0],
      height   : 10
    },
    {
      position : [ 17, 0, -10],
      height   : 10
    },
    {
      position : [ 9, 0, -7],
      height   : 10
    },
    {
      position : [ 9, 0, -29],
      height   : 10
    },
    {
      position : [ 13, 0, -26],
      height   : 10
    },
    {
      position : [ 17, 0, -33],
      height   : 10
    },
    {
      position : [ 14, 0, -38],
      height   : 10
    },
    {
      position : [ 10, 0, -34],
      height   : 10
    },
    {
      position : [ 12, 0, -45],
      height   : 10
    },
    {
      position : [ 9, 0, -40],
      height   : 10
    },
    {
      position : [ 17, 0, -43],
      height   : 10
    },
    {
      position : [ 17, 0, -50],
      height   : 10
    },
    {
      position : [ 14, 0, 22],
      height   : 10
    },
    {
      position : [ 15, 0, 6],
      height   : 10
    },
    {
      position : [ 0, 0, 14],
      height   : 10
    },
    {
      position : [ 2, 0, 22],
      height   : 10
    },
    {
      position : [ 8, 0, 18],
      height   : 10
    },
    {
      position : [ 3, 0, 5],
      height   : 10
    },
    {
      position : [ -5, 0, 5],
      height   : 10
    },
    {
      position : [ -20, 0, 4],
      height   : 10
    },
    {
      position : [ -12, 0, 7],
      height   : 10
    },
    {
      position : [ -18, 0, 10],
      height   : 10
    },
    {
      position : [ -7, 0, 13],
      height   : 10
    },
    {
      position : [ -6, 0, 21],
      height   : 10
    },
    {
      position : [ -22, 0, 20],
      height   : 10
    },
    {
      position : [ -40, 0, 22],
      height   : 10
    },
    {
      position : [ -34, 0, 22],
      height   : 10
    },
    {
      position : [ -27, 0, 5],
      height   : 10
    },
    {
      position : [ -15, 0, 20],
      height   : 10
    },
    {
      position : [ -32, 0, 14],
      height   : 10
    },
    {
      position : [ -29, 0, 19],
      height   : 10
    }
  ],

  buildings : [
    {
      outline : [
      47, 0, -65,   10,
      47, 0, -55,   10,
      38, 0, -55,   10,
      38, 0, -65,   10,
      ]
    },
    {
      outline : [
      61, 0, -60,   10,
      61, 0, -50,   10,
      52, 0, -50,   10,
      52, 0, -60,   10,
      ]
    },
    {
      outline : [
      61, 0, -40,   10,
      61, 0, -30,   10,
      52, 0, -30,   10,
      52, 0, -40,   10,
      ]
    },
    {
      outline : [
      61, 0, -20,   10,
      61, 0, -10,   10,
      52, 0, -10,   10,
      52, 0, -20,   10,
      ]
    },
    {
      outline : [
      61, 0, 0,   10,
      61, 0, 10,   10,
      52, 0, 10,   10,
      52, 0, 0,   10,
      ]
    },
    {
      outline : [
      61, 0, 20,   10,
      61, 0, 30,   10,
      52, 0, 30,   10,
      52, 0, 20,   10,
      ]
    },
    {
      outline : [
      61, 0, 40,   10,
      61, 0, 50,   10,
      52, 0, 50,   10,
      52, 0, 40,   10,
      ]
    },
    {
      outline : [
      47, 0, -45,   10,
      47, 0, -35,   10,
      38, 0, -35,   10,
      38, 0, -45,   10,
      ]
    },
    {
      outline : [
      47, 0, -25,   10,
      47, 0, -15,   10,
      38, 0, -15,   10,
      38, 0, -25,   10,
      ]
    },
    {
      outline : [
      47, 0, -5,   10,
      47, 0, 5,   10,
      38, 0, 5,   10,
      38, 0, -5,   10,
      ]
    },
    {
      outline : [
      47, 0, 15,   10,
      47, 0, 25,   10,
      38, 0, 25,   10,
      38, 0, 15,   10,
      ]
    },
    {
      outline : [
      35, 0, 45,   10,
      35, 0, 55,   10,
      26, 0, 55,   10,
      26, 0, 45,   10,
      ]
    },
    {
      outline : [
      16, 0, 45,   10,
      16, 0, 55,   10,
      7, 0, 55,   10,
      7, 0, 45,   10,
      ]
    },
    {
      outline : [
      -3, 0, 45,   10,
      -3, 0, 55,   10,
      -12, 0, 55,   10,
      -12, 0, 45,   10,
      ]
    },
    {
      outline : [
      -22, 0, 45,   10,
      -22, 0, 55,   10,
      -31, 0, 55,   10,
      -31, 0, 45,   10,
      ]
    },
    {
      outline : [
      -41, 0, 45,   10,
      -41, 0, 55,   10,
      -50, 0, 55,   10,
      -50, 0, 45,   10,
      ]
    },
    {
      outline : [
      -60, 0, 45,   10,
      -60, 0, 55,   10,
      -69, 0, 55,   10,
      -69, 0, 45,   10,
      ]
    },
    {
      outline : [
      92, 0, 80,   10,
      92, 0, 90,   10,
      83, 0, 90,   10,
      83, 0, 80,   10,
      ]
    },
    {
      outline : [
      73, 0, 80,   10,
      73, 0, 90,   10,
      64, 0, 90,   10,
      64, 0, 80,   10,
      ]
    },
    {
      outline : [
      54, 0, 80,   10,
      54, 0, 90,   10,
      45, 0, 90,   10,
      45, 0, 80,   10,
      ]
    },
    {
      outline : [
      35, 0, 80,   10,
      35, 0, 90,   10,
      26, 0, 90,   10,
      26, 0, 80,   10,
      ]
    },
    {
      outline : [
      16, 0, 80,   10,
      16, 0, 90,   10,
      7, 0, 90,   10,
      7, 0, 80,   10,
      ]
    },
    {
      outline : [
      -3, 0, 80,   10,
      -3, 0, 90,   10,
      -12, 0, 90,   10,
      -12, 0, 80,   10,
      ]
    },
    {
      outline : [
      -22, 0, 80,   10,
      -22, 0, 90,   10,
      -31, 0, 90,   10,
      -31, 0, 80,   10,
      ]
    },
    {
      outline : [
      -41, 0, 80,   10,
      -41, 0, 90,   10,
      -50, 0, 90,   10,
      -50, 0, 80,   10,
      ]
    },
    {
      outline : [
      -60, 0, 80,   10,
      -60, 0, 90,   10,
      -69, 0, 90,   10,
      -69, 0, 80,   10,
      ]
    },
    {
      outline : [
      -79, 0, 80,   10,
      -79, 0, 90,   10,
      -88, 0, 90,   10,
      -88, 0, 80,   10,
      ]
    },
    {
      outline : [
      -63, 0, 25,   10,
      -63, 0, 35,   10,
      -72, 0, 35,   10,
      -72, 0, 25,   10,
      ]
    },
    {
      outline : [
      -63, 0, 5,   10,
      -63, 0, 15,   10,
      -72, 0, 15,   10,
      -72, 0, 5,   10,
      ]
    },
    {
      outline : [
      -63, 0, -15,   10,
      -63, 0, -5,   10,
      -72, 0, -5,   10,
      -72, 0, -15,   10,
      ]
    },
    {
      outline : [
      92, 0, 60,   10,
      92, 0, 70,   10,
      83, 0, 70,   10,
      83, 0, 60,   10,
      ]
    },
    {
      outline : [
      92, 0, 40,   10,
      92, 0, 50,   10,
      83, 0, 50,   10,
      83, 0, 40,   10,
      ]
    },
    {
      outline : [
      92, 0, 20,   10,
      92, 0, 30,   10,
      83, 0, 30,   10,
      83, 0, 20,   10,
      ]
    },
    {
      outline : [
      92, 0, 0,   10,
      92, 0, 10,   10,
      83, 0, 10,   10,
      83, 0, 0,   10,
      ]
    },
    {
      outline : [
      92, 0, -20,   10,
      92, 0, -10,   10,
      83, 0, -10,   10,
      83, 0, -20,   10,
      ]
    },
    {
      outline : [
      92, 0, -40,   10,
      92, 0, -30,   10,
      83, 0, -30,   10,
      83, 0, -40,   10,
      ]
    },
    {
      outline : [
      92, 0, -60,   10,
      92, 0, -50,   10,
      83, 0, -50,   10,
      83, 0, -60,   10,
      ]
    },
    {
      outline : [
      92, 0, -80,   10,
      92, 0, -70,   10,
      83, 0, -70,   10,
      83, 0, -80,   10,
      ]
    },
  ],

  weather : {
    sunLightDirection : [ 0.4, 1, 0.6 ],
    cloudDensity      : 0,
    rainStrength      : 0
  }
};
