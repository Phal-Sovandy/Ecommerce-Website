import "../styles/component-styles/ProductWindow.css";

function ProductWindow(){
    return (
        <div className="product-window">
            <div className="image-holder">
                <img src="" alt="product image"></img>
            </div>
            <div className="item-details">
                <h2>Name</h2>
                <p>Keywords1 | Keywords2 | Keywords3</p>
                <div className="product-rating">
                    <img src="" alt="rating"></img>
                    <p>star count(Product rating number)</p>
                </div>
                <div className="price">$2000</div>
                <button className="addToCart-btn">Add to Cart</button>
                <div className="size-selection">
                    <h4>Size Selections</h4>
                    <div className="selection-container">
                        <div>XS</div>
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>2XL</div>
                    </div>
                </div>
                <div className="shoes-size-selection">
                    <h4>Size Selections</h4>
                    <div className="selection-container">
                        <div>44</div>
                        <div>45</div>
                        <div>48</div>
                        <div>49</div>
                        <div>50</div>
                        <div>55</div>
                    </div>
                </div>
                <div className="choice-selection">
                    <h4>Choice Selections</h4>
                    <div className="selection-container">
                        <div>Red</div>
                        <div>Blue</div>
                        <div>Green</div>
                        <div>Yellow</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductWindow;