var labelType, useGradients, nativeTextSupport, animate, st;
var infovisLeft, infovisTop;
var canvasMaxHeight = 14000; // infovis.css("height");
var canvasMaxWidth = 1000; // infovis.css("width");

function newNode(parentNodeId) {
    //return false;
    //remove +/-
    //alert("OK");
    var nodeButtons = $("#node-buttons");
    nodeButtons.remove();
    //add a node to json

    //add an item to list

    var json = st.json;
    //how many children do we have?
    //what is the level
    var level = parentNodeId.split("_").length;
    switch (level) {
        case 1:
            var child = { id: parentNodeId + "_99999", name: "AA", data: { l: 2, edit: true }, children: [] };
            json.children[json.children.length] = child;
            init(json);
//            var m = {
//                offsetX: st.canvas.translateOffsetX,
//                offsetY: st.canvas.translateOffsetY
//            };
            st.onClick(parentNodeId);
            break;
        case 2:
            alert("not implemented");
            break;
        case 3:
            alert("not implemented");
            break;
        default:
            throw new Error("more than one covering div");
    }

}




    function getData(id, action, par1) {

        var json =
		{ "id": "dm1", name: "Unit=2 RAR", data: {}, children: [
		]
		};
        //alert("click");
        //do ajax, get the tree

        $.ajax({
            type: "POST",
            url: "ajax.aspx",
            dataType: "json",
            success: function (data) {
                //var json1 = data;
                //alert(data);
                init(data);
                //init(json);
            },
            fail: function () {
                alert("fail");
            },
            data: { i: id, a: action, p1: par1}        //context: document.body
        }).done(function () {
            //alert("done");
            //init(json);
        });
        return false;
    }

    function node_btn(id, action, name) {
        return "<li><a href='#' onclick='newNode(\"" + id + "\"," + action + ")'><img src='images/" + name + ".png' alt='" + name + "' /></a></li>";
    }


    function cancel() {
        alert("cancel");
        return false;
    }
    function save(node_id) {
        alert("save");
        getData(node_id, 1, "new node" + new Date().getUTCMilliseconds());
        //remove the edit div
        var nodeEdit = $("#node-edit");
        nodeEdit.remove();
        //remove the covering div
        uncover();
        return false;
    }
    function coverClick() {
        alert("Please use item close buttons");
    }

    function uncover() {
        var cover = $("#cover");
        if (cover.length > 1)
            throw new Error("more than one covering div");
        cover.remove();
        //    while (true) {
        //        var element = document.getElementById("cover");
        //        if (element == null)
        //            break;
        //        element.parentNode.removeChild(element);
        //    }
        //    //var body = $("body");
        //body.remove("#cover");
        //alert(body.innerHTML);
        //cover[0].remove();
    }


    function change(id, action) {
        if (action == 1) {
            depth = id.split('_').length;
            if (depth < 3) {
                //edit item
                getData(id, action, "new node" + new Date().getUTCMilliseconds());
            }
            else
                throw new Error("invalid depth");

        }
        else if (action == 2) {
            alert("not implemented");
        }
        else if (action == 3) {
            alert("not implemented");
        }
        else {
            alert("invalid action");
        }
        $("#node-buttons").remove();

        uncover();
    }

    (function () {
        var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
        //I'm setting this based on the fact that ExCanvas provides text support for IE
        //and that as of today iPhone/iPad current text support is lame
        labelType = (!nativeCanvasSupport || (textSupport && !iStuff)) ? 'Native' : 'HTML';
        nativeTextSupport = labelType == 'Native';
        useGradients = nativeCanvasSupport;
        animate = !(iStuff || !nativeCanvasSupport);
    })();



    function init(json) {
        //init data
        //if 
        //end
        //alert("init");
        //size of canvas
        var infovis = $("#infovis");
        //var offset = 100; // (infovis[0].clientWidth / 2) - 100;
        //init Spacetree
        //Create a new ST instance
        st = new $jit.ST({
            //'width': 1000,
            //'height': 3000,
            //            canvasWidth: 1000,
            //            canvasHeight: 350,

            offsetX: 300,
            levelsToShow: 3,  //limits the number of levels to be displayed at one time
            //constrained: true,
            //id of viz container element
            injectInto: 'infovis',
            //set duration for the animation
            duration: 8,
            //set animation transition type
            transition: $jit.Trans.Quart.easeInOut,
            //set distance between node and its children
            levelDistance: 100,
            //enable panning
            Navigation: {
                //enable: true,
                //panning: true//,
                //zooming: 10
            },
            //set node and edge styles
            //set overridable=true for styling individual
            //nodes or edges
            Node: {
                height: 30, //set the height (it actually controls the spacing between nodes)
                width: 100,
                type: 'rectangle', //type must be specified
                //autoWidth: true,			
                color: 'none', //background of node, default rgb(85,85,85), 'none' for transparent
                align: "center",
                overridable: true
            },

            Edge: {
                type: 'bezier',
                //type: 'quadratic:end',

                overridable: true
            },

            onBeforeCompute: function (node) {
            },

            onAfterCompute: function () {
                //infovisvar a1 = canvas.element.clientHeight;
                //var height = $("#infovis-canvas").css("height");
                //var width = $("#infovis-canvas").css("height");
                //$("#infovis").css("width", 1000);
                //$("#infovis").css("height", 300);
                //session-content
                //                $("#session-content").css("height", 700);
                //                $("#session-content").css("width", 700);
                //                $("#session-content").css("background-color", "green");

                //$("#content-wrap").css("height", 700);
                //$("#content-wrap").css("width", 700);
                //$("#content-wrap").css("background-color", "green");

                //                $("#infovis").css("height", 650);
                //                $("#infovis").css("width", 650);
                //                $("#infovis").css("background-color", "yellow");

                //$("#infovis-canvas").css("width", "1000px");
                //$("#infovis-canvaswidget").css("width", "1000px");
                //                $("#infovis-canvaswidget").css("height", 600); //this is needed to keep the scrollbars
                //                $("#infovis-canvas").css("background-color", "white");
                //                $("#infovis-canvaswidget").css("overflow", "auto");


                //$("#infovis-canvas").css("overflow", "auto");
                //$("#infovis-canvas").css("width", 500);
                //var can = this.canvas;
                //this.height = 900;
                //load json data
            },

            //This method is called on DOM label creation.
            //Use this method to add event handlers and styles to
            //your node.
            onCreateLabel: function (label, node) {
                var id = node.id;
                label.id = node.id;
                label.innerHTML = node.name;
                var att = label.attributes;

                //use jquery
                var $label = $("#" + label.id);
                switch (node.data.l) {
                    case 1:
                        //alert("set class");
                        //$label.addClass("nodeXXXX");
                        break;
                    case 2:
                        label.attributes["class"].value += " action";
                        break;
                    case 3:
                        label.attributes["class"].value += " info";
                        break;
                    default:
                        throw new Error("invalid node type" + node.data.l);
                }
                label.onclick = function () {
                    //return false;
                    //                    var m = {
                    //                        offsetX: st.canvas.translateOffsetX,
                    //                        offsetY: st.canvas.translateOffsetY
                    //                    };
                    //                    st.onClick(node.id, { Move: m }); 
                    //is the node editable
                    //alert("OLLL");
                    var that = $("#" + this.id);
                    var offset = that.offset();
                    var left = offset.left + 110;
                    var top = offset.top - 20;
                    if (false) {
                    }
                    else {
                        var hidden = $("<div id='cover' onclick='coverClick()'></div>"); //style='background-color:green;position:absolute;left:0;top:0;height:100%;width:100%' 
                        var body = $("body");
                        body.append(hidden);
                        var div = "<div id='node-buttons' style='z-index:1001;width:100px;height:20px;POSITION:absolute;left:" + left + "px;top:" + top + "px'>"
                                    + "<ul>"
                                        + node_btn(id, 1, "plus")
                                        + node_btn(id, 2, "minus")
                                        + node_btn(id, 3, "edit")
                                    + "</ul>"
                              + "</div>"
                        body.append(div);

                    }

                };
                //set label styles
                var style = label.style;
                //style.width = node.name.length * 0.5 +'em'; // 100 + 'px';
                style.height = '20px';
                style.cursor = 'pointer';
                //style.color = '#555';
                style.fontSize = '0.8em';
                style.textAlign = 'left';
                style.paddingTop = '3px';
                style.paddingLeft = '3px';
                style.whiteSpace = 'nowrap';

                //style.left = '33px';

            },

            onPlaceLabel: function (label, node) {
                //alert(label.id);
                //var left = label.style.left;
                //var infovis = $("#infovis")[0];
                //                var height = infovis.css("height");
                //                var width = infovis.css("width");
                //var offsetLeft = label.offsetLeft + infovis.offsetLeft;
                //var offsetTop = label.offsetTop + infovis.offsetTop - 40;

                //alert(offsetTop);
                var offset = $("#" + label.id).offset();
                var left = offset.left; // infovisLeft + label.offsetLeft;
                var top = offset.top;  //infovisTop + label.offsetTop;
                canvasMaxHeight = (canvasMaxHeight < top) ? top : canvasMaxHeight;
                if (typeof node.data.edit != 'undefined' && node.data.edit == true) {
                    //alert("OKKKKK");
                    //we need a div
                    //var infovis = $("#infovis")[0];
                    //                var height = infovis.css("height");
                    //                var width = infovis.css("width");
                    var offset = $("#" + label.id).offset();
                    var left = offset.left; // infovisLeft + label.offsetLeft;
                    var top = offset.top;  //infovisTop + label.offsetTop;
                    //var offsetTop = label.offsetTop + 100; // infovisTop - 40;
                    //                var that = $("#" + label.id);
                    //                //var hidden = $("<div id='cover' style='background-color:green;position:absolute;left:0;top:0;height:100%;width:100%' onclick='uncover(this)'></div>");
                    //                //body.append(hidden);
                    var body = $("body");
                    //                var div = "<div id='node-buttons' onclick='test1()' style='z-index:1001;background-color:yellow;width:100px;height:20px;POSITION:absolute;left:" + offsetLeft + "px;top:300px'>ok</div>"
                    var div = '<div id="node-edit" class="nodeZ nodeXXXX" style="position: absolute; height: 20px; cursor: pointer; font-size: 0.8em; text-align: left; padding-top: 3px; padding-left: 3px; white-space: nowrap; left:' + left + 'px;top:' + top + 'px;"><input type="text" style="width:80px"></input><a style="top:-30px" href="#" onclick="cancel()"><img src="images/close.png" /></a><a style="top:-30px" href="#" onclick=""><img src="images/icon-action.png"/></a></div>';
                    //var div = $("<div id='node-edit' style='z-index:1002;width:200px;height:40px;position:absolute;left:" + left + "px;top:" + top + "px;padding-top:20px'><div><a style='top:-30px' href='#' onclick='cancel()'><img src='images/close.png' /></a><a style='top:-30px' href='#' onclick='save(\"" + label.id + "\")'><img src='images/icon-action.png' /></a><select><option>SIC</option></select></div><input type='text' value='OKKKK'></input></div>");
                    body.append(div);


                    //node.data.$color = "#ff0";
                }
                else {
                }
            },
            //This method is called right before plotting
            //a node. It's useful for changing an individual node
            //style properties before plotting it.
            //The data properties prefixed with a dollar
            //sign will override the global node style properties.
            onBeforePlotNode: function (node) {
                //add some color to the nodes in the path between the
                //root node and the selected node.
                //node.data.$color = "#AAE9FF";
                //ar style = node.style;
                //style.backgroundColor = 'rgb(107, 215, 241)';			
                var $label = $("#" + node.id);
                switch (node.data.l) {
                    case 1:
                        //alert("set class");
                        $label.addClass("nodeXXXX");
                        break;
                    case 2:
                        node.data.$class = "nodeaction";
                        break;
                    case 3:
                        node.data.$class = "nodeinfo";
                        break;
                    default:
                        throw new Error("invalid node type" + node.data.l);
                }
            },
            onAfterPlotNode: function (node) {
                var ddd = document.getElementById(node.id);
                var $label = $("#" + node.id);
                var i = 2;

            },

            onAfterCompute: function () {
                var opt = st.graph.opt;
                //pt.compute(1);

            },
            onComplete: function () {
                var opt = st.graph.opt;
                //st.onClick(st.root, { Move: { enable: true, offsetY: 200} });
                //pt.compute(1);

            },

            //This method is called right before plotting
            //an edge. It's useful for changing an individual edge
            //style properties before plotting it.
            //Edge data proprties prefixed with a dollar sign will
            //override the Edge global style properties.
            onBeforePlotLine: function (adj) {
                if (adj.nodeFrom.selected && adj.nodeTo.selected) {
                    adj.data.$lineWidth = 3;
                }
                else {
                    delete adj.data.$lineWidth;
                }
            }

        });
        //"overflow-y:scroll;"
        //        var height = $("#infovis-canvas").css("height");
        //        var width = $("#infovis-canvas").css("height");
        //        $("#infovis").css("width", 100);
        //$("#infovis-canvas").css("overflow", "scroll");
        //        //load json data
        st.loadJSON(json);
        st.compute();
        var rootNode = st.graph.nodes[st.root];
        //var v = st.geom.treeFitsInCanvas(rootNode, st.canvas);
        var level;
        var baseSize = st.geom.getTreeBaseSize(rootNode, level, function (level, node) {
            return level === 0 || !node.anySubnode();
        });
        baseSize += 100;


        //ToDo: position the tree
        st.compute();
        //st.onClick(st.root, { Move: { offsetX: 300, offsetY: 100} });
        var shiftUp = Math.floor(baseSize / 2 - 200);
        st.config.offsetX = 400;
        st.config.offsetY = (baseSize / 2 - 200)
        //st.geom.translate(new $jit.Complex(-200, -500), "current");
//                st.select(st.root, {
//            onComplete: function () {
//                alert('complete!');
//            }
//        });
        //st.onClick(st.root, { Move: { enable: false, offsetY: (baseSize / 2 - 200)} });
        //st.onClick(st.root, { Move: { enable: true} });
        st.onClick(st.root);
        st.canvas.resize(1000, baseSize); //this must be above the canvaswidget resize
        $("#infovis-canvaswidget").css("height", 500); //this is needed to keep the scrollbars
        $("#infovis-canvas").css("background-color", "white");
        $("#infovis-canvaswidget").css("overflow", "auto");
        //end
        var g = st;
        //alert("done");

    }

    $(document).ready(function () {

        //put the sc

//        var winHeight = $(window).height();
//        var winWidth = $(window).width();
//        infovisLeft = parseInt($("#mailbox").css("width").replace("px", ""));
//        infovisTop = $("#email-content")[0].offsetTop;  //String($("#mailbox").css("top").replace("px", ""));
//        var infovisWidth = winWidth - infovisLeft;
//        $("#email-content").css("width", infovisWidth);


        //$("#infovis").css("height", 650);
        //$("#infovis").css("width", "100%");
        //$("#infovis").css("background-color", "yellow");

        //load the tree
        getData("dm1", 0);
        var mailbox = $("#infovis");
        //var emailContentOffset = mailbox[0].offsetWidth;
        //alert(emailContentOffset);
        //mailbox.width = 1000;
        //the size of canvas

    })
