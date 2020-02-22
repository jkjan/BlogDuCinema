class Genre {
    title_genre;
    content_genre;
}

class GenrePage extends React.Component {
    _isMounted = false;
    genreNum = 1;
    state = {
        genre : Genre
    };

    constructor(props) {
        super(props);
    }

    changeGenre(e, index) {
        this.componentWillUnmount();
        this.genreNum = index;
        this.componentDidMount();
    }

    get() {
        axios.get('https://likelion8th-test.herokuapp.com/genre/'+this.genreNum+'/').then((response) => {
            if (this._isMounted) {
                this.setState({
                    genre: response.data,
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
        const categoryData = ["서부영화",
            "공포영화",
            "SF영화",
            "뮤지컬영화",
            "로맨스영화",
            "전쟁영화",
            "갱스터영화",
            "애니메이션",
            "모험영화"];
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
                                        <hr/><br/>다양한 장르<br/><br/></h1>
                                    <h3>{this.state.genre.title_genre}<br/><br/></h3>
                            </div>
                            <aside>
                                <ul id="categories">{categoryItems}</ul>
                            </aside>
                            <div className="article-body">
                                {this.state.genre.content_genre}
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
ReactDOM.render(e(GenrePage), document.getElementById("test"));