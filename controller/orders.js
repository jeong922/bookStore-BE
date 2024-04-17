import {
  addDelivery,
  addOrder,
  addOrdered,
  getOrderById,
  getOrderList,
} from '../model/orders.js';

export async function order(req, res, next) {
  //TODO:userId 받아오기 수정
  const {
    userId,
    items,
    delivery,
    totalPrice,
    totalQuantity,
    paymentInformation,
  } = req.body;
  const deliveryId = await addDelivery(delivery, userId);
  const orderId = await addOrder(
    items,
    userId,
    deliveryId,
    totalPrice,
    totalQuantity,
    paymentInformation
  );

  const ordered = await addOrdered(orderId, items);

  //TODO:장바구니 삭제 구현하기(주문 구현 테스트 끝나면)

  res.status(201).json(ordered);
}

export async function getOrders(req, res, next) {
  const { userId } = req.body;
  const orders = await getOrderList(userId);

  res.status(200).json(orders);
}

// export async function getOrders(req, res, next) {
//   const { userId } = req.body;
//   const orders = await getOrderList(userId);

//   const list = orders.map((order) => {
//     const {
//       id,
//       createdAt,
//       bookTitle,
//       totalPrice,
//       totalQuantity,
//       paymentInformation,
//       address,
//       receiver,
//       contact,
//     } = order;
//     return {
//       id,
//       createdAt,
//       bookTitle,
//       totalPrice,
//       totalQuantity,
//       paymentInformation,
//       delivery: {
//         address,
//         receiver,
//         contact,
//       },
//     };
//   });
//   res.status(200).json(list);
// }

export async function getOrderDetail(req, res, next) {
  const { id } = req.params;
  const detail = await getOrderById(id);

  res.status(200).json(detail);
}
