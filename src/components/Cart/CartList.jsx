const CartList = ({ items, onRemove }) => {
  return (
    <div className="cart-list">
      {items.map((item) => (
        <CartItem key={item.id} item={item} onRemove={onRemove} />
      ))}
      <TotalAmount items={items} />
    </div>
  );
};

export default CartList;
