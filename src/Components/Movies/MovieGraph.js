import React, {Component} from 'react'
var d3 = require("d3");


const data = {
    nodes: [
        {
            name: "actor",
            id: 1,

            
        },
        {
            Title: "The Prestige",
            id: 2,
            Poster: "https://m.media-amazon.com/images/M/MV5BMjA4NDI0MTIxNF5BMl5BanBnXkFtZTYwNTM0MzY2._V1_SX300.jpg"
        },
        {
            Title: "Hobbit",
            id: 3,
            Poster: "https://m.media-amazon.com/images/M/MV5BMTcwNTE4MTUxMl5BMl5BanBnXkFtZTcwMDIyODM4OA@@._V1_SX300.jpg",
        }
    ],
    links: [
        {
            source: 1,
            target: 0,
            // value: 1,
        }
    ]
}



export class MovieGraph extends Component{
    constructor(props){
        super(props);
        

        this.state = {
        }

        this.makeNodesAndLinks = this.makeNodesAndLinks.bind(this);
    }

    drag = (simulation) => {
        function dragStart(d) {
            if(!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragEnded(d) {
            if(!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        return d3.drag()
            .on("start", dragStart)
            .on("drag", dragged)
            .on("end", dragEnded);
    }


    chart(nodes, links) {
        const width=1920;
        const height=1080;

        const obj_links = links.map(d => Object.create(d));
        const obj_nodes = nodes.map(d => Object.create(d));


        const svg = d3.create("svg")
            .attr("viewBox", [0, 0, width, height]);



        const simulation = d3.forceSimulation(obj_nodes)
            .force("link", d3.forceLink().links(links).id(d => {return d.index;}).distance(200))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width/2, height/2));


        
        const link = svg.append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(obj_links)
            .join("line")
            .attr("stroke-width", d=> Math.sqrt(d.value));

        const defs = svg.append("defs")
            .selectAll("pattern")
            .data(obj_nodes)
            .join("pattern")
                // .attr("id", "pattern")
                .attr("id", d => "pattern" + d.imdbID)
                .attr("width", 20)
                .attr("height", 20)
                // .attr("patternUnits", "userSpaceOnUse")
                .append("image")
                .attr("xlink:href", d => d.Poster)
                // .attr("href", "../../images/me.jpg")
                // .attr("width", 48)
                // .attr("height", 48)
                .attr("x", -40)
                .attr("y", -20)

        const color = (node) => {
            if(node.group === "actors")
                return(d3.color("steelblue"));
            return("url(#pattern" + node.imdbID  + ")") // It's a movie
        }

        const radius = (node) => {
            if(node.group === "actors")
                return(20);
            return(100);
        }

        const node = svg.append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .selectAll("circle")
            .data(obj_nodes)
            .join("circle")
                .attr("r", radius)
                .attr("fill", color)
                .call(this.drag(simulation))


        simulation.on("tick", () =>{
                link
                    .attr("x1", d => d.source.x)
                    .attr("y1", d => d.source.y)
                    .attr("x2", d => d.target.x)
                    .attr("y2", d => d.target.y)
    
                node
                    .attr("cx", d => d.x)
                    .attr("cy", d => d.y)
            });
    



        return svg.node();
    }


    makeNodesAndLinks(movies){
        var nodes = {};
        var movieArr = Object.values(movies)
        // Get movies and actors out of movies
        movieArr.forEach((movie) => {
            nodes[movie.imdbID] = movie;
            var actors = movie.Actors;
            var actorsArr = actors.split(",")
            actorsArr.forEach(x => 
                nodes[x.trim()] = {name: x.trim(), group: "actors"}
            )
            console.log(nodes)
        })

        // Convert nodes into list
        nodes = Object.values(nodes)
        console.log(nodes)

        // Make link list to describe how movies connect to actors
        var links = [];
        nodes.forEach(function(item, i) {
            if(item.Actors){ // Is a movie
                var actorsArr = item.Actors.split(",") // get all actors in movie
                actorsArr.forEach(actor => {
                    nodes.forEach(function(item, j){
                        if(item.group === "actors"){ // is an actor
                            if(item.name === actor.trim()){ // is in the moive
                                links.push({source: i, target: j})
                            }
                        }
                    })
                })

            }
        })
        return [nodes, links];
    }



    componentWillReceiveProps(nextProps){
        if(this.props.toDisplay !== nextProps.toDisplay){
            var elem = document.getElementById("mysvg");
            elem.style.display = nextProps.toDisplay ? "block" : "none";
            
            if(nextProps.toDisplay && (this.props.movies !== nextProps.movies)){
                var nodesAndLinks;
                nodesAndLinks = this.makeNodesAndLinks(nextProps.movies)
                elem.appendChild(this.chart(nodesAndLinks[0], nodesAndLinks[1]))
            }
        }
        

        
    }

    componentDidMount(){
        var elem = document.getElementById("mysvg");
        elem.style.display = "none";
        // elem.appendChild(this.chart(data.nodes, data.links));
    }



    render(){
        return(
            <div id="mysvg"></div>
        )
    };
}
export default MovieGraph;
