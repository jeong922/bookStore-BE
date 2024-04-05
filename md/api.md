# API 설계(수정필요함)

## 회원 API 설계

- **회원 Schema**
  ```
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

### ➡️ 회원가입

**method** : `POST`

**URI** : `/join`

**HTTP status code** : ✅ `201`

**request body**

```
{
	email : 이메일
	password : 비밀번호
}
```

**response body**

```

```

### ➡️ 로그인

**method** : `POST`

**URI** : `/login`

**HTTP status code** : ✅ `200`

**request body**

```
{
	email : 이메일,
	password : 비밀번호,
}
```

**response body**

```
JWT Token
```

### ➡️ 비밀번호 초기화 요청

**method** : `POST`

**URI** : `/reset`

**HTTP status code** : ✅ `200`

**request body**

```
{
	email : 이메일
}
```

**response body**

```

```

### ➡️ 비밀번호 초기화

**method** : `PUT`

**URI** : `/reset`

**HTTP status code** : ✅ `200`

**request body**

```
{
	password : 비밀번호
}
```

**response body**

```

```

## 도서 API 설계

- **도서 Shema**
  ```
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
  	likes int
  	liked boolean
  	publishedDate timestamp
  	img text
  }
  ```

### ➡️ 전체 조회

**method** : `GET`

**URI** : `/books`

**HTTP status code** : ✅ `200`

**request body**

❗페이지네이션 → 도서정보 8개씩 나눠서 전달 추가 필요

```

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

### ➡️ 개별 조회

**method** : `GET`

**URI** : `/books/{:bookId}`

**HTTP status code** : ✅ `200`

**request body**

```

```

**response body**

```
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
	likes : 좋아요 수,
	liked : 나의 좋아요 여부(true/false),
	publishedDate: 출간일,
	img : 도서 이미지(여러장)
}
```

### ➡️ 카테고리별 도서 조회

- **카테고리 Shema**
  ```
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

```
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

```

```

## 좋아요 API 설계

- **좋아요 Shema**
  ```
  {
  	id int,
  	bookId int,
  	userId int
  }
  ```

### ➡️ 좋아요 추가

**method** : `PUT`

**URI** : `/likes/{:bookId}` ⇒ `users/{:userId}/likes/{:bookId}` (일단 내 생각은 이럼..)

**HTTP status code** : ✅ `200`

**request body**

❗좋아요 처리 방법 수정 필요

```

```

**response body**

```

```

### ➡️ 좋아요 취소

**method** : `PUT` ⇒ DELETE

**URI** : `/likes/{:bookId}` ⇒ `users/{:userId}/likes/{:bookId}` (일단 내 생각은 이럼..)

**HTTP status code** : ✅ `200`

**request body**

❗좋아요 처리 방법 수정 필요

```

```

**response body**

```

```

## 장바구니 API 설계

- **장바구니 Shema**
  ```
  {
  		id int
  		bookId int
      userId int
  		title varchar
  		summary varchar
  		price int
  		quantity int
  }
  ```

### ➡️ 장바구니 담기

**method** : `POST`

**URI** : `/cart`

**HTTP status code** : ✅ `201`

**request body**

```
{
	bookId : 도서 id,
	quantity : 수량
}
```

**response body**

```

```

### ➡️ 장바구니 조회

**method** : `GET`

**URI** : `/cart`

**HTTP status code** : ✅ `200`

**request body**

```

```

**response body**

```
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

### ➡️ 장바구니 삭제

**method** : `DELETE`

**URI** : `/cart/{:bookId}`

**HTTP status code** : ✅ `200` → 아니면 `204`

**request body**

```

```

**response body**

```

```

## 주문 API 설계

### ➡️ 장바구니에서 선택한 상품 목록 조회

**method** : `GET`

**URI** :

**HTTP status code** : ✅ `200`

**request body**

```

```

**response body**

```
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

1. 장바구니 리스트에서 사용자가 선택한 것만 배열로 받아서 주문페이지에 주문상품 리스트를 보여주고 결제 버튼을 누르면 그걸 주문번호를 추가해서 DB에 저장
2. 일단 생각중..
