import React, {Component} from 'react'
var d3 = require("d3");


const data = {
    nodes: [
        {
            name: "actor",
            id: 1,

            
        },
        {
            name: "The Prestige",
            id: 2,
            Poster: "https://m.media-amazon.com/images/M/MV5BMjA4NDI0MTIxNF5BMl5BanBnXkFtZTYwNTM0MzY2._V1_SX300.jpg"
        },
        {
            name: "Hobbit",
            id: 3,
            Poster: "https://m.media-amazon.com/images/M/MV5BMTcwNTE4MTUxMl5BMl5BanBnXkFtZTcwMDIyODM4OA@@._V1_SX300.jpg",
        }
    ],
    links: [
        {
            source: 1,
            target: 0,
            value: 1,
        }
    ]
}



export class MovieGraph extends Component{
    constructor(props){
        super(props);
        

        this.state = {
        }
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
                .attr("id", d => "pattern" + d.id)
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
            if(node.id === 1) // It's a first name
                return(d3.color("blue"));
            // return("url(#pattern)")
            return("url(#pattern" + node.id + ")")
            // return(d3.color("steelblue"));
        }

        const radius = (node) => {
            if(node.id === 1) // It's a first name
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
                // .append("image")
                // .attr("xlink:href", "http://placekitten.com/g/48/48")



        // const images = node.append("image")
        //     .attr("xlink:href", "http://placekitten.com/g/48/48")
        //     .attr("width", 48)
        //     .attr("height", 48)
        //     .attr("x", 10)
        //     .attr("y", 10)


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


    componentWillReceiveProps(nextProps){
        var elem = document.getElementById("mysvg");
        elem.style.display = nextProps.toDisplay ? "block" : "none";
    }

    componentDidMount(){
        var elem = document.getElementById("mysvg");
        elem.style.display = "none";
        elem.appendChild(this.chart(data.nodes, data.links));
    }



    render(){
        return(
            <div id="mysvg"></div>
        )
    };
}
export default MovieGraph;
