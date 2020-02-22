class Dictionary {
    id_dict = 0;
    title_dict = "";
    content_dict = "";
}

class DictionaryPage extends React.Component {
    _isMounted = false;
    alpha = "ㄱ";

    state = {
        dict: [Dictionary],
        clicked: false,
        edit : [false]
    };

    constructor(props) {
        super(props);
        this.changeAlpha = this.changeAlpha.bind(this)
    }

    get(alpha) {
        axios.get('https://likelion8th-test.herokuapp.com/dictionary/' + alpha + '/').then((response) => {
            if (this._isMounted) {
                this.setState({
                    dict: response.data
                })

            }
            console.log(this.state.dict[0].title_dict);
        });
    }

    componentDidMount() {
        this._isMounted = true;
        this.get(this.alpha)
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    changeAlpha(e, alpha) {
        console.log(alpha);
        this.componentWillUnmount();
        this.alpha = alpha;
        this.componentDidMount();
    }

    startEdit(e, index) {
        this.state.edit[index] = true;
        this.forceUpdate();
        console.log(index + " is ");
        console.log(this.state.edit[index]);
    }

    stopEdit(e, index) {
        this.state.edit[index] = false;
        this.forceUpdate();
    }

    post(e) {
        let dict_input = document.getElementById("dict_input").value;
        let dict_temp = dict_input;
        let content_input = document.getElementById("content_input").value;
        let content_temp = content_input;
        console.log(dict_temp);
        console.log(content_temp);
        console.log(this.alpha);
        console.log('https://likelion8th-test.herokuapp.com/dictionary/' + this.alpha + '/');
        axios.post('https://likelion8th-test.herokuapp.com/dictionary/' + this.alpha + '/', {
            title_dict: dict_temp,
            alpha : this.alpha,
            content_dict: content_temp
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    put(e, id, index) {
        if (this._isMounted) {
            let dict_input = document.getElementById("dict_put").value;
            let dict_temp = dict_input;
            let content_input = document.getElementById("content_put").value;
            let content_temp = content_input;
            axios.put('https://likelion8th-test.herokuapp.com/dictionary/' + this.alpha + '/' + id + '/', {
                title_dict: dict_temp,
                alpha : this.alpha,
                content_dict: content_temp
            })
                .then((response) => {
                    this.state.dict[index].title_dictionary = dict_temp;
                    this.state.dict[index].content_dictionary = content_temp;
                    this.forceUpdate();
                    console.log(response);
                })
        }
    }

    delete(e, id, index) {
        axios.delete('https://likelion8th-test.herokuapp.com/dictionary/' + this.alpha + '/' + id + '/').then((response) => {
            console.log(response);

            if (this._isMounted) {
                this.setState({
                    dict: this.state.dict.filter((_, i) => i !== index)
                })
            }
        });
    }

    render() {
        const style = {
            borderTop: '1px solid #C8C8C8',
            padding: '20px',
        };
        const buttons={
            marginRight:'10px'
        };
        const dictData = this.state.dict;
        const dictItems = dictData.map((d, index) =>
            <li key={d.id_dict} style={style}>
                <h3>
                    {d.title_dict}
                </h3>
                <br/>
                {d.content_dict}
                <br/>
                <br/>
                <div>
                    {this.state.edit[index] ?
                        <div>
                            <form action="/action_page.php" method="put">
                                용어: <input type="text" name="dict" id="dict_put" width='500px'/><br />
                                내용: <input type="text" name="content" id="content_put" width='500px' height='1000px'/><br />
                                <button onClick={(e)=>this.put(e, d.id_dict, index)} type="button">보내기</button>
                            </form>
                            <br/>
                            <button onClick={(e)=>this.stopEdit(e, index)}>취소</button>
                            <br/>
                        </div>
                        : null}
                </div>
                <button type="수정" style={buttons} onClick={(e)=>this.startEdit(e, index)}>수정</button>
                <button type="삭제" style={buttons} onClick={(e)=>this.delete(e, d.id_dict, index)}>삭제</button>
            </li>
        );

        const categoryStyle = {
            margin: '0px 10px 0px -120px',
            width: '100px',
            height: '40px',
            paddingTop: '20px',
            textAlign: 'center',
            backgroundColor: 'black',
            hover: {
                backgroundColor: 'red'
            },
            color: 'white'
        };

        const categoryData = ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
        const categoryItems = categoryData.map((category) =>
            <li id="category"><a onClick={(e) => this.changeAlpha(e, category)}><b>{category}</b></a></li>
        );

        const asideStyle = {
            position:'-webkit-sticky',
            marginTop :'-500px',
        };

        return (
            <div>
                <div id="content">
                    <section id="main-section">
                        <article>
                            <div className="article-header">
                                <h1 className="article-title"><br/><br/><br/><br/>
                                    <br/>{this.alpha}<br/><br/></h1>
                                <h5 id="ctrlf">Ctrl + F로 원하는 단어를 쉽게 찾을 수 있습니다.</h5><br/><br/>
                            </div>
                            <aside>
                                <ul id="categories">{categoryItems}</ul>
                            </aside>

                            <div className="article-body">
                                {dictItems}
                            </div>
                        </article>
                    </section>
                </div>
                <br/>
                <form action="/action_page.php" method="get">
                    용어: <input type="text" name="dict" id="dict_input" width='500px' /><br />
                    내용: <input type="text" name="content" id="content_input" width='500px' /><br />
                    <button onClick={(e)=>this.post(e)} type="button">보내기</button>
                </form>
                <br/>
                <br/>
                <br/>
                <hr/>
                <br/>
                <br/>
                <h4 id="copyright" align="center">Copyright © All Rights Reserved</h4>
            </div>
        );
    }
}

const e = React.createElement;
ReactDOM.render(e(DictionaryPage), document.getElementById("test"));