
function ProductCard({ product }){
    return (
        <div key={product.id} className="product-card">
            <img src={product.image}/>
        </div>
    );
}
export default ProductCard;