import { Component } from "react";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import CodePreview from '@uiw/react-code-preview';
import axios from 'axios';
//("function App() { \n  return (<div><h3>Js-markdown-extension</h3><hr/><p>Here is your new component. Write and save</p></div>); \n} \n ReactDOM.render(<App />, _mount_);")
class Editor extends Component {
    constructor(props) {
        super(props)

        this.state = {
            code: "",
            saving:false
        }

       this.exitEditor = this.exitEditor.bind(this);
       this.saveCode = this.saveCode.bind(this);
       this.updateCode = this.updateCode.bind(this);
    }

    componentDidMount(){
        this.setState({code: localStorage.getItem("code")});
    }

    updateCode(value){
        this.setState({code:value});
    }

    exitEditor(){
        localStorage.clear();
    }

    saveCode(){
        this.setState({saving:true})
        localStorage.setItem("code",this.state.code)
        axios.post('http://localhost:8080/instance/data/set', {
            key: localStorage.getItem("key"),
            data: this.state.code
        }).then(res => {
            this.setState({saving:false})
        }).catch(err => {
            alert(err)
            console.log(err);
        });
    }
    render() {
        if (this.state.saving) {
            return (
                <div class="container-fluid p-0 m-0" style={{ 'text-align': "initial" }}>
                    <h1> SAVING...</h1>
          </div>
            )
        }
        return (
            <div class="container-fluid p-0 m-0" style={{ 'text-align': "initial" }}>
                <div class="row">
                    <div class="col-12 p-2 ps-4">
                        <a href="" onClick={this.saveCode}> Save </a>
                        <a class="ms-3" onClick={this.exitEditor} href=""> Exit </a>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12" style={{ 'font-size': "20px" }}>
                        <CodeMirror
                            value={this.state.code}
                            height="700px"
                            extensions={[javascript({ jsx: true })]}
                            onChange={this.updateCode}
                            theme="dark"
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-12" style={{ 'height': "500px" }}>
                        <CodePreview bgWhite='true' code={this.state.code} />
                    </div>
                </div>
            </div>
        );
    }
}


export default Editor;