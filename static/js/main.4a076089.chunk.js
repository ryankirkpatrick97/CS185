(this.webpackJsonpportfolio=this.webpackJsonpportfolio||[]).push([[0],{180:function(e,t,a){},181:function(e,t,a){},209:function(e,t,a){},210:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),r=a(21),l=a.n(r),c=(a(89),a(4)),s=a(5),o=a(7),m=a(6),u=a(17),d=a(68),p=a.n(d),h=(a(180),a(181),a(69)),b=a.n(h),v=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){return i.a.createElement(u.a,null,i.a.createElement("div",{className:"content"},i.a.createElement("div",{className:"item"},i.a.createElement("img",{src:b.a,alt:"Me",style:{width:"100%",max_width:"300px"}})),i.a.createElement("div",{class:"item"},i.a.createElement("p",null,"My name is Ryan Kirkpatrick and I am a first year grad student in the CE Master's program."),i.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."))))}}]),a}(n.Component),E=a(70),f=a.n(E),g=a(71),y=a.n(g),j=a(72),C=a.n(j),k=a(73),O=a.n(k),w=a(74),x=a.n(w),N=a(75),I=a.n(N),T=a(76),P=a.n(T),B=a(77),L=a.n(B),D=a(78),M=a.n(D),_=a(79),S=a.n(_),F=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"resizeImagesPage",value:function(e){var t,a=document.getElementsByClassName("column");if(e.matches)for(t=0;t<a.length;t++)a[t].style.msFlex="100%",a[t].style.flex="100%";else for(t=0;t<a.length;t++)a[t].style.msFlex="33%",a[t].style.flex="33%"}},{key:"render",value:function(){var e=window.matchMedia("(max-width: 800px)");return this.resizeImagesPage(e),e.addListener(this.resizeImagesPage),i.a.createElement(u.a,null,i.a.createElement("div",null,i.a.createElement("h1",null,"Cabo Trip Summer 2019"),i.a.createElement("div",{class:"row"},i.a.createElement("div",{class:"column"},i.a.createElement("img",{src:f.a,alt:"Cabo Trip"}),i.a.createElement("img",{src:y.a,alt:"Cabo Trip"}),i.a.createElement("img",{src:C.a,alt:"Cabo Trip"})),i.a.createElement("div",{class:"column"},i.a.createElement("img",{src:O.a,alt:"Cabo Trip"}),i.a.createElement("img",{src:x.a,alt:"Cabo Trip"}),i.a.createElement("img",{src:I.a,alt:"Cabo Trip"}),i.a.createElement("img",{src:P.a,alt:"Cabo Trip"})),i.a.createElement("div",{class:"column"},i.a.createElement("img",{src:L.a,alt:"Cabo Trip"}),i.a.createElement("img",{src:M.a,alt:"Cabo Trip"}),i.a.createElement("img",{src:S.a,alt:"Cabo Trip"})))))}}]),a}(n.Component),R=a(13),A=a(182),G=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={ids:["tt0061418","tt0033467","tt0068646","tt0137523","tt0114814","tt0169547","tt0144084","tt0206634","tt1130884","tt0092005","tt0338013","tt0264464","tt0075314","tt0066921","tt0432283","tt0034583","tt0099348","tt0095016"],response:[]},n.displayLightBox=n.displayLightBox.bind(Object(R.a)(n)),n.hideLightbox=n.hideLightbox.bind(Object(R.a)(n)),n}return Object(s.a)(a,[{key:"componentDidMount",value:function(){var e=this,t=this.state.ids.map((function(e){return A.get("https://www.omdbapi.com/?apikey=d0b4efe6&i="+e)}));Promise.all(t).then((function(t){t.forEach((function(t){var a=e.state.response;a.push({Poster:t.data.Poster,Title:t.data.Title,Director:t.data.Director,Rating:t.data.imdbRating,Plot:t.data.Plot}),e.setState({response:a})}))}))}},{key:"hideLightbox",value:function(e){var t=document.getElementById("lightbox");"lightbox"===e.target.id&&(document.body.style.overflowY="scroll",t.style.display="none")}},{key:"displayLightBox",value:function(e){var t=document.getElementById("lightbox"),a=document.getElementById("LBPosterTitle"),n=document.getElementById("LBPosterDirector"),i=document.getElementById("LBPosterRating"),r=document.getElementById("LBPosterPlot"),l=document.getElementById("overlay_img");document.body.style.overflow="hidden",t.style.display="flex",l.src=e.Poster,l.alt=e.Title,a.textContent=e.Title,n.textContent="Directed by "+e.Director,i.textContent="IMDB Rating: "+e.Rating+"/10",r.textContent=e.Plot,parseFloat(e.Rating)>=7?i.style.color="green":i.style.color="red"}},{key:"render",value:function(){var e=this;return i.a.createElement("div",null,i.a.createElement("div",{className:"posterGrid"},this.state.response.map((function(t){return i.a.createElement("div",{className:"poster"},i.a.createElement("img",{className:"posterImg",src:t.Poster,alt:t.Title,onClick:function(){return e.displayLightBox(t)}}))}))),i.a.createElement("div",{className:"lightbox",id:"lightbox",style:{display:this.state.lbDisplay},onClick:this.hideLightbox},i.a.createElement("div",{className:"LBDisplay",id:"LBDisplay"},i.a.createElement("img",{className:"LBImage",id:"overlay_img",alt:"overlay"}),i.a.createElement("div",{className:"LBInfo",id:"LBInfo"},i.a.createElement("div",{id:"LBPosterTitle"}),i.a.createElement("div",{id:"LBPosterDirector"}),i.a.createElement("div",{id:"LBPosterRating"}),i.a.createElement("div",{id:"LBPosterPlot"})))))}}]),a}(n.Component),Y=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement("div",null,i.a.createElement("h1",null,"Capstone Demo: 2018-2019")),i.a.createElement("div",{className:"container"},i.a.createElement("iframe",{title:"Capstone",class:"video",src:"https://www.youtube.com/embed/XMk__Djtibg?wmode=opaque",frameborder:"0",allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:!0})),i.a.createElement("div",null,i.a.createElement("h1",null,"ECE 153 Project")),i.a.createElement("div",{className:"container"},i.a.createElement("iframe",{title:"ECE153",class:"video",src:"https://www.youtube.com/embed/9jjcRcZ2lSg?wmode=opaque",frameborder:"0",allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:!0})),i.a.createElement("div",null,i.a.createElement("h1",null,"ECE179D Robotics Project 1")),i.a.createElement("div",{className:"container"},i.a.createElement("iframe",{title:"Robotics 1",class:"video",src:"https://www.youtube.com/embed/fQDsw4yPw_c?wmode=opaque",frameborder:"0",allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:!0})),i.a.createElement("div",null,i.a.createElement("h1",null,"ECE179D Robotics Project 2")),i.a.createElement("div",{className:"container"},i.a.createElement("iframe",{title:"Robotics 2",class:"video",src:"https://www.youtube.com/embed/v-9yMAVkSok?wmode=opaque",frameborder:"0",allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:!0})))}}]),a}(n.Component),q=a(80),U=a.n(q),z=a(81),K=a.n(z),W=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement("div",{className:"content"},i.a.createElement("div",{className:"item"},i.a.createElement("a",{href:"https://ieacapstone.wordpress.com/",target:"_blank",rel:"noopener noreferrer"},i.a.createElement("img",{className:"project_img",alt:"IEA Project",src:U.a}))),i.a.createElement("div",{className:"item"},i.a.createElement("h1",null,"Intelligent Engineering Assistant Capstone Project 2018-2019"))),i.a.createElement("div",{className:"content"},i.a.createElement("div",{className:"item"},i.a.createElement("a",{href:"https://sites.google.com/view/film-website/home",target:"_blank",rel:"noopener noreferrer"},i.a.createElement("img",{className:"project_img",alt:"Film Project",src:K.a}))),i.a.createElement("div",{className:"item"},i.a.createElement("h1",null,"Film: Android Application developed to allow users to share their favorite movies"))))}}]),a}(n.Component),H=a(82),J={apiKey:"AIzaSyCgWBU5EKsEjAI5htEKWe-fYS9UcU44YBs",authDomain:"cs185-758b4.firebaseapp.com",databaseURL:"https://cs185-758b4.firebaseio.com"},V=a(83),Q=a.n(V),X=a(67),Z=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).handleChange=function(e){var t=e.target.name,a=e.target.value;n.setState(Object(H.a)({},t,a))},n.state={name:"",description:"",message:"",display:"Yes",email:"",time:""},n.handleChange=n.handleChange.bind(Object(R.a)(n)),n.handleSubmit=n.handleSubmit.bind(Object(R.a)(n)),n}return Object(s.a)(a,[{key:"handleSubmit",value:function(e){var t=this;this.state.name.length<6||this.state.name.length>19?alert("Please insert a name that is more than 5 characters and less than 20"):this.state.description.length>99?alert("Please insert a description shorter than 100 characters"):this.state.message.length<16||this.state.message.length>499?alert("Please insert a message that is longer than 15 characters but shorter than 500"):this.setState({time:Q()().utcOffset("-07:00").format("YYYY-MM-DD hh:mm:ss a")},(function(){t.updateFirebase(),document.getElementById("userInput").reset(),alert("Database has been updated successfully.")})),e.preventDefault()}},{key:"updateFirebase",value:function(){X.apps.length||X.initializeApp(J),X.database().ref("response").push().set(this.state)}},{key:"render",value:function(){return i.a.createElement("form",{id:"userInput",onSubmit:this.handleSubmit},i.a.createElement("label",null,i.a.createElement("div",{className:"FeedbackLabel"},"Name:"),i.a.createElement("textarea",{type:"text",name:"name",onChange:this.handleChange})),i.a.createElement("label",null,i.a.createElement("div",{className:"FeedbackLabel"},"Personal Description:"),i.a.createElement("textarea",{type:"text",name:"description",onChange:this.handleChange})),i.a.createElement("label",null,i.a.createElement("div",{className:"FeedbackLabel"},"Email:"),i.a.createElement("textarea",{type:"text",name:"email",onChange:this.handleChange})),i.a.createElement("label",null,i.a.createElement("div",{className:"FeedbackLabel"},"Message:"),i.a.createElement("textarea",{type:"text",name:"message",onChange:this.handleChange})),i.a.createElement("label",null,i.a.createElement("div",{className:"FeedbackLabel"},"Would you like to display your message to everyone?"),i.a.createElement("select",{value:this.state.display,name:"display",onChange:this.handleChange},i.a.createElement("option",{name:"display",value:"Yes",onChange:this.handleChange},"Yes"),i.a.createElement("option",{name:"display",value:"No",onChange:this.handleChange},"No"))),i.a.createElement("div",{className:"submitButton"},i.a.createElement("input",{type:"submit",value:"Submit"})))}}]),a}(n.Component),$=a(67),ee=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={response:[]},n}return Object(s.a)(a,[{key:"componentDidMount",value:function(){var e=this;$.apps.length||$.initializeApp(J),$.database().ref("response").on("value",(function(t){var a=t.val(),n=[];for(var i in a)n.push({id:i,name:a[i].name,description:a[i].description,message:a[i].message,display:"Yes"===a[i].display,email:a[i].email,time:a[i].time});e.setState({response:n})}))}},{key:"componentDidUpdate",value:function(e,t,a){this.state.shouldUpdate,t.shouldUpdate}},{key:"displayMessage",value:function(e){if(e.display)return i.a.createElement("div",{id:"itemMessage"},"Feedback: ",e.message)}},{key:"displayEmail",value:function(e){if(e.email.length>0)return i.a.createElement("div",{id:"itemEmail"},"Email: ",e.email," ")}},{key:"displayDescription",value:function(e){if(e.description.length>0)return i.a.createElement("div",{id:"itemDescription"},"Description: ",e.description," ")}},{key:"render",value:function(){var e=this;return i.a.createElement("div",{className:"FirebaseScroll"},i.a.createElement("ul",{className:"FeedbackList"},this.state.response.slice(0).reverse().map((function(t){return i.a.createElement("div",{className:"FeedbackItemContainer"},i.a.createElement("li",{className:"FeedbackItem"},i.a.createElement("div",{id:"itemTime"},t.time),i.a.createElement("div",{id:"itemName"},"Name: ",t.name),e.displayEmail(t),e.displayDescription(t),e.displayMessage(t)))}))))}}]),a}(n.Component),te=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){return i.a.createElement("div",{className:"content"},i.a.createElement("div",{className:"item"},i.a.createElement(Z,null)),i.a.createElement("div",{className:"item"},i.a.createElement(ee,null)))}}]),a}(n.Component),ae=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).displayContent=function(){var t=e.props.activeTab;return 1===t?i.a.createElement(v,null):2===t?i.a.createElement(F,null):3===t?i.a.createElement(G,null):4===t?i.a.createElement(Y,null):5===t?i.a.createElement(W,null):6===t?i.a.createElement(te,null):void 0},e}return Object(s.a)(a,[{key:"render",value:function(){return this.displayContent(this.props.activeTab)}}]),a}(n.Component),ne=(a(209),function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){return i.a.createElement("footer",null,i.a.createElement("a",{href:"https://www.linkedin.com/in/ryankirkpatrick97/"},i.a.createElement("i",{className:"fa fa-linkedin"})),i.a.createElement("a",{href:"https://github.com/ryankirkpatrick97"},i.a.createElement("i",{className:"fa fa-github"})))}}]),a}(n.Component)),ie=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){return i.a.createElement("header",null,i.a.createElement("h2",null,"CS 185 - Human-Computer Interface"),i.a.createElement("h2",null,"Homework 6"),i.a.createElement("h2",null,i.a.createElement("i",null,"Ryan Kirkpatrick")))}}]),a}(n.Component),re=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];return(e=t.call.apply(t,[this].concat(i))).chooseActive=function(){return e.props.tab.id===e.props.activeTab?"nav-item nav-item-active":"nav-item"},e}return Object(s.a)(a,[{key:"render",value:function(){return i.a.createElement("div",{className:this.chooseActive(),onClick:this.props.changeTab.bind(this,this.props.tab.id)},this.props.tab.title)}}]),a}(n.Component),le=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){var e=this;return this.props.tabs.map((function(t){return i.a.createElement(re,{tab:t,activeTab:e.props.activeTab,changeTab:e.props.changeTab})}))}}]),a}(n.Component),ce=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(){var e;return Object(c.a)(this,a),(e=t.call(this)).state={activeTab:1},e.changeTab=function(t){e.setState({activeTab:t})},e}return Object(s.a)(a,[{key:"render",value:function(){return i.a.createElement(u.b,null,i.a.createElement("body",null,i.a.createElement("div",{className:"page"},i.a.createElement("div",{className:"header"},i.a.createElement(ie,null)),i.a.createElement("div",{className:"nav-bar"},i.a.createElement(le,{tabs:[{id:1,title:"Home"},{id:2,title:"Images"},{id:3,title:"Movies"},{id:4,title:"Videos"},{id:5,title:"Projects"},{id:6,title:"Feedback"}],activeTab:this.state.activeTab,changeTab:this.changeTab})),i.a.createElement("section",null,i.a.createElement("div",{className:"body"},i.a.createElement(ae,{activeTab:this.state.activeTab}))),i.a.createElement("div",{className:"footer"},i.a.createElement(ne,null))),i.a.createElement(p.a,null)))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(ce,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},69:function(e,t,a){e.exports=a.p+"static/media/me.e239300a.jpg"},70:function(e,t,a){e.exports=a.p+"static/media/IMG_0001.376bfe34.jpg"},71:function(e,t,a){e.exports=a.p+"static/media/IMG_0031.971e8599.jpg"},72:function(e,t,a){e.exports=a.p+"static/media/IMG_0037.ea50e183.jpg"},73:function(e,t,a){e.exports=a.p+"static/media/IMG_0082.d8e3c1e9.jpg"},74:function(e,t,a){e.exports=a.p+"static/media/IMG_0120.91e19f68.jpg"},75:function(e,t,a){e.exports=a.p+"static/media/IMG_8398.ca50ae4e.jpg"},76:function(e,t,a){e.exports=a.p+"static/media/IMG_9421.90934559.jpg"},77:function(e,t,a){e.exports=a.p+"static/media/IMG_9158.e8961ca9.jpg"},78:function(e,t,a){e.exports=a.p+"static/media/IMG_9409.b73863cd.jpg"},79:function(e,t,a){e.exports=a.p+"static/media/LRG_DSC01327.4df7e86a.jpg"},80:function(e,t,a){e.exports=a.p+"static/media/cropped-iea_logo_transparent-1.28c7805b.png"},81:function(e,t,a){e.exports=a.p+"static/media/film.fade633d.png"},84:function(e,t,a){e.exports=a(210)},89:function(e,t,a){}},[[84,1,2]]]);
//# sourceMappingURL=main.4a076089.chunk.js.map