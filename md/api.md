# API 설계

## 회원 API 설계

- **회원 Schema**
  ```sql
  {
  	id int
  	name varchar
  	email varchar
  	password varchar
  	contact varchar
  	address varchar
  	createdAt timestamp
  	updatedAt timestamp
  }
  ```

### 회원가입

**method** : `POST`

**URI** : `/join`

**HTTP status code** : ✅ `201`

**request body**

```json
{
	email : 이메일,
	password : 비밀번호,
}
```

**response body**

```

```

### 로그인

**method** : `POST`

**URI** : `/login`

**HTTP status code** : ✅ `200`

**request body**

```json
{
	email : 이메일,
	password : 비밀번호,
}
```

**response body**

```
JWT Token
```

### 비밀번호 초기화 요청

**method** : `POST`

**URI** : `/reset`

**HTTP status code** : ✅ `200`

**request body**

```json
{
	email : 이메일
}
```

**response body**

```json

```

### 비밀번호 초기화

**method** : `PUT`

**URI** : `/reset`

**HTTP status code** : ✅ `200`

**request body**

```json
{
	password : 비밀번호
}
```

**response body**

```json

```

## 도서 API 설계

- **도서 Schema**
  ```sql
  {
  	id int
  	title varchar
  	categoryId int
  	format varchar
  	author varchar
  	isbn varchar
  	pages int
  	summary varchar
  	description varchar
  	index int
  	price int
  	--likes int
  	--liked boolean
  	publishedDate timestamp
  	img text
  }
  ```

### 전체 조회

**method** : `GET`

**URI** : `/books`

**HTTP status code** : ✅ `200`

**request body**

❗페이지네이션 → 도서정보 8개씩 나눠서 전달 추가 필요(`SELECT` 할때 `LIMIT`을 사용하면 될 듯?)

```json

```

**response body**

```
[
	{
		id : 도서 id,
		title : 도서 제목,
		author : 작가,
		summary : 요약 설명,
		price : 가격,
		likes : 좋아요 수,
		img : 도서 이미지,
		publishedDate: 출간일
	},
	...
]
```

### 개별 조회

**method** : `GET`

**URI** : `/books/{:bookId}`

**HTTP status code** : ✅ `200`

**request body**

```json

```

**response body**

```json
{
	id : 도서 id,
	title : 도서 제목,
	category : 도서 카테고리,
	format : 포맷(ebook, 종이),
	author : 작가,
	isbn : ISBN,
	pages : 쪽 수,
	summary : 요약 설명,
	description : 상세 설명,
	index : 목차,
	price : 가격,
	// likes : 좋아요 수,
	publishedDate: 출간일,
	img : 도서 이미지(여러장)
}
```

### 카테고리별 도서 조회

- **카테고리 Schema**
  ```json
  {
  	id int
  	category varchar
  }
  ```

**method** : `GET`

**URI** : `/books?categoryId={:categoryId}&new={:boolean}`

**HTTP status code** : ✅ `200`

**request body**

❗카테고리id 전달 방법 추가 필요 →❓카테고리 테이블을 따로 만들어서 join 연산?

❗new : true ⇒ 시간 조회(출간일 30일 이내)

```json
[
	{
		id : 도서 id,
		title : 도서 제목,
		author : 작가,
		summary : 요약 설명,
		price : 가격,
		likes : 좋아요 수,
		publishedDate: 출간일,
		img : 도서 이미지
	},
	...
]
```

**response body**

```json

```

## 좋아요 API 설계

- **좋아요 Schema**
  ```sql
  {
  	id int,
  	bookId int,
  	userId int
  }
  ```

### 좋아요 추가

**method** : `POST`

**URI** : `/likes/{:bookId}` ⇒ `likes/{:userId}/{:bookId}` (대충 이런식으로..?)

**HTTP status code** : ✅ `200`

**request body**

```json

```

**response body**

```json

```

### 좋아요 취소

**method** : `DELETE`

**URI** : `/likes/{:bookId}` ⇒ `likes/{:userId}/{:bookId}` (대충 이런식으로..?)

**HTTP status code** : ✅ `200`

**request body**

❗좋아요 처리 방법 수정 필요

```json

```

**response body**

```json

```

## 장바구니 API 설계

- **장바구니 Schema**
  ```sql
  {
  	id int,
  	bookId int,
  	userId int,
  	quantity int
  }
  ```

### 장바구니 담기

**method** : `POST`

**URI** : `/carts`

**HTTP status code** : ✅ `201`

**request body**

```json
{
	bookId : 도서 id,
	quantity : 수량
}
```

**response body**

```json

```

### 장바구니 조회

**method** : `GET`

**URI** : `/carts`

**HTTP status code** : ✅ `200`

**request body**

```json

```

**response body**

```json
[
	{
		id: 장바구니 도서 id,
		bookId: 도서 id,
		title: 제목,
		summary: 요약 설명,
		price: 가격,
		quantity : 수량
	},
	...
]
```

### 장바구니 삭제

**method** : `DELETE`

**URI** : `/carts/{:bookId}`

**HTTP status code** : ✅ `200` → 아니면 `204`

**request body**

```json

```

**response body**

```json

```

### 장바구니에서 선택한 상품 목록 조회(주문 예상 목록 조회)

**method** : `GET`

**URI** : `/carts/{:cartItemId}`

**HTTP status code** : ✅ `200`

**request body**

```json
[cartItemId, cartItemId, ....]
```

**response body**

```json
[
	{
		cartItemId: 장바구니 도서 id,
		bookId: 도서 id,
		title: 제목,
		summary: 요약 설명,
		price: 가격,
		quantity : 수량
	},
	...
]
```

❓해결방법 고민

1. 장바구니 리스트에서 사용자가 선택한 것만(상품 id) 배열로 받아서 주문페이지에 주문상품 리스트를 보여주고 결제 버튼을 누르면 그걸 주문번호를 추가해서 DB에 저장

## 주문(결제) API 설계

- **주문 Schema**
  ```sql
  {
  id int,
    deliveryId int,
    totalPrice int,
    mainBookTitle varchar,
    totalQuantity int,
    createdAt timestamp
  }
  ```
- **배달정보 Schema**
  ```sql
  {
  id int,
    address text,
    receiver varchar,
    contact varchar
  }
  ```
- **주문된 도서 정보 Schema**
  ```sql
  {
    id int,
    orderId int,
    bookId int,
    quantity int
  }
  ```

### 주문 등록

**method** : `POST`

**URI** : `/orders`

**HTTP status code** : ✅ `200`

**request body**

```json
{
	items : [
				{
					cartItemId : 장바구니 도서 id,
					bookId : 도서 id,
					quantity : 수량
				},
						...
			],
	deliver : {
				address : 주소,
				receiver: 이름,
				contact : 연락처
			  },
	totalPrice : 총금액
}
```

**response body**

```json

```

도서 정보는 프론트엔드에서 배열로 받아오기

주문이 완료된 도서는 cart에서 삭제

### 주문 목록 조회

**method** : `GET`

**URI** : `/orders`

**HTTP status code** : ✅ `200`

**request body**

```json

```

**response body**

```json
[
	{
		orderId : 주문 id,
		createdAt: 주문일자,
		delivery : {
						address : 주소,
						receiver : 이름,
						contact : 전화번호
					},
		bookTitle : 대표 도서 제목,
		totalPrice : 결제 금액,
		totalQuantity : 총 수량,
	},
	...
]
```

### 주문 상세 상품 조회

**method** : `GET`

**URI** : `/orders/{:orderId}`

**HTTP status code** : ✅ `200`

**request body**

```json

```

**response body**

```json
[
	{
		bookId : 도서 id,
		title : 도서 제목,
		author : 작가,
		price : 가격,
		quantity : 수량
	},
	...
]
```

⬇️아마도 수정이 필요할듯..?

![book store.png](../img/book%20store.png)
