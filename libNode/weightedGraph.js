var heapModule = require('./binaryHeap.js');
const DISTANCE_PROP = 1;
const CONNECTED_BY_PROP = 2;

class WeightedGraph
{
  constructor(file)
  {
    this.load = false;

    this.loadGraphAsList(file);
  }

  loadGraphAsList(file)
  {
    console.time('loadList');

    var nVertex = parseInt(file[0]);

    this.nVertex = nVertex;
    this.nEdges = file.length - 2;
    this.degrees = new Array(nVertex + 1);
    this.averageDegree = (2 * this.nEdges)/this.nVertex;
    this.list = new Array(nVertex + 1);

    for (var i = 1; i <= this.nEdges; i++)
    {
      var vertex = file[i].split(" ");
      var vertex0 = parseInt(vertex[0]);
      var vertex1 = parseInt(vertex[1]);
      var weight = parseInt(vertex[2]);

      if (weight < 0) {
        throw new Error('Not supported negative weight in edge ' + file[i]);
      }

      if(typeof this.list[vertex0] == "undefined")
      {
        this.list[vertex0] = new Array();
      }
      if(typeof this.list[vertex1] == "undefined")
      {
        this.list[vertex1] = new Array();
      }

      this.list[vertex0].push([vertex1, weight]);
      this.list[vertex1].push([vertex0, weight]);

      //for each edge, add 1 on deegre of each vertex of this edge
      if(typeof   this.degrees[vertex0] == "undefined")
      {
        this.degrees[vertex0] = 1;
      }
      else
      {
        this.degrees[vertex0]++;
      }
      if(typeof   this.degrees[vertex1] == "undefined")
      {
        this.degrees[vertex1] = 1;
      }
      else
      {
        this.degrees[vertex1]++;
      }
    }
    console.timeEnd('loadList');
  }

  /**
   * search by dijkstra
   *
   * return array of [index of this vertex, distance from origin, vertex connecting this one, position in heap ]
   */
  search(origin)
  {
    var vertices = new Array(this.nVertex + 1);

    var heap = new heapModule.BinaryHeap(function(a) {
      return a[DISTANCE_PROP];
    });

    var infiniteDistance = Infinity;

    var vertex;
    for (var i = 1, limit = vertices.length; i < limit; i++) {
      vertex = [i, infiniteDistance, null, null];
      vertices[i] = vertex;
      heap.push(vertex);
    }
    vertices[origin][DISTANCE_PROP] = 0;

    // format of heap's items: [index, distance]
    heap.bubbleUpItem(vertices[origin]);

    var u;
    var v;
    var uDistance;
    var vWeight;
    var neighbors;
    var connectedBy;
    var position
    while(heap.size() != 0)
    {
      [u, uDistance, connectedBy, position] = heap.pop();

      neighbors = this.list[u];

      for (var i = 0, iLimit = neighbors.length; i < iLimit; i++) {
        [v, vWeight] = neighbors[i];

        if(vertices[v][DISTANCE_PROP] > vertices[u][DISTANCE_PROP] + vWeight)
        {
          vertices[v][DISTANCE_PROP] = vertices[u][DISTANCE_PROP] + vWeight;
          vertices[v][CONNECTED_BY_PROP] = u;

          heap.bubbleUpItem(vertices[v]);
        }
      }
    }
    return vertices;
  }

  mst()
  {
    var graph = this.list;
    this.parents = new Array(nVertex + 1);

    for (var i = 1; i <= this.nVertex; i++)
    {
      costI = Infinity; 
      var s = [];
     // while(!isTheSameArray(graph, s))


    }

  }

  writeMSTInFile()
  {

  }
}

exports.WeightedGraph = WeightedGraph;
