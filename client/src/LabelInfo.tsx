
function LabelInfo({name, genres, mood, eps}: Label) {
    return (
        <div className="LabelInfo">
            {name}
            {eps}
            {genres}
            {mood}
        </div>
    );

}

export default LabelInfo;
