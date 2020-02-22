class History {
    title_genre;
    content_genre;
}

class HistoryPage extends React.Component {
    _isMounted = false;
    historyNum = 1;
    state = {
        history : History
    };

    constructor(props) {
        super(props);
    }

    changeGenre(e, index) {
        this.componentWillUnmount();
        this.historyNum = index;
        this.componentDidMount();
    }

    get() {
        axios.get('https://likelion8th-test.herokuapp.com/history/'+this.historyNum+'/').then((response) => {
            if (this._isMounted) {
                this.setState({
                    history: response.data,
                })
            }
        });
    }

    componentDidMount() {
        this._isMounted = true;
        this.get()
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const categoryData = [
            "1890년대",
            "1900년대",
            "1910년대",
            "1920년대",
            "1930년대",
            "1940년대",
            "1950년대",
            "1960년대",
            "1970년대",
            "현대"];
        const categoryItems = categoryData.map((category, index) =>
            <li id="category"><a onClick={(e) => this.changeGenre(e, index+1)}><b>{category}</b></a></li>
        );

        return (
            <div>
                <div id="content">
                    <section id="main-section">
                        <article>
                            <div className="article-header">
                                <h1 className="article-title"><br/><br/><br/><br/>
                                    <hr/><br/>영화의 역사<br/><br/></h1>
                                <h3>{this.state.history.title_history}<br/><br/></h3>
                            </div>
                            <aside>
                                <ul id="categories">{categoryItems}</ul>
                            </aside>
                            <div className="article-body">
                                {this.state.history.content_history}
                            </div>
                        </article>
                    </section>
                </div>
                <br/>
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
ReactDOM.render(e(HistoryPage), document.getElementById("test"));