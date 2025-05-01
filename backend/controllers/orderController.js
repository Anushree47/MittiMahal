const generateReceiptData = (order) => {
    const taxAmount = order.gstAmount || 0;
    const discount = order.discount || 0;
    const deliveryCharge = order.deliveryCharge || 0;
  
    const finalAmount = order.totalAmount + taxAmount + deliveryCharge - discount;
  
    return {
      orderId: order._id,
      items: order.items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      subTotal: order.totalAmount,
      taxAmount,
      deliveryCharge,
      discount,
      totalAmount: finalAmount,
      deliveryAddress: formatAddress(order.address),
      user: {
        name: order.userId?.name || 'N/A',
        email: order.userId?.email || 'N/A',
        phone: order.userId?.phone || 'N/A',
      },
      placedOn: order.createdAt,
    };
  };
  
  const formatAddress = (address) => {
    if (!address) return 'No address found';
    return `${address.addressLine1}, ${address.addressLine2}, ${address.city}, ${address.state} - ${address.postalCode}, ${address.country}`;
  };
  
  module.exports = { generateReceiptData };
  