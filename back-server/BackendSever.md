# 💻BackEnd Server

- 빈 디렉토리는 `dump.txt`로 채워두었스빈다!

## 변경해 주세요!!
- 테스트 버전이므로 DB는 localhost를 사용해주세요!.
- `src/main/resources/application.properties` 파일에서 수정합니다.
```properties
# mysql
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/DB명?serverTimezone=Asia/Seoul
spring.datasource.username=MySQL아이디
spring.datasource.password=MySQL비밀번호
```

## Github 설정
- 테스트 단계이므로 간단하게 각자 브랜치만 사용하면 될 것같습니다!
  - 남규 : Namgyu
  - 권민 : Kwonmin
  - 은진 : Eunjin
- Commit 메시지는 각자 알아서 해도 되지 않을까요? 😀

## Spring Security 설정
- 현재 설정은 모든 Reqeust에 대해 permitAll() 입니다.
  - 로그인, 회원가입 등의 동작이 없으므로 회원 정보가 필요한 경우 수동으로 설정하시면 될 것같습니다?

## Swagger 설정
- 접속 주소 : http://localhost:8080/swagger-ui/index.html
- 주요 어노테이션
  - `@Api` : 클래스를 Swagger 리소스 대상으로 표시.
    - 사용 대상 : Class(RestController는 없어도 그냥 되는것 같더라구요?)
  - `@ApiOperation` : 요청 URL에 매핑된 API에 대한 설명.
    - 사용 대상 : Method(함수)
    - value : API에 대한 간단한 설명.
    - notes : 작업에 대한 자세한 설명.
    - response : 반환 타입.
  - `@ApiParam` : 매개변수에 대한 추가 메타데이터.
    - 사용 대상 : 함수의 매개변수
    - value : 매개변수에 대한 간단한 설명.
    - required : 매개변수 필수 여부.
  - `@ApiResponse` : 응답에 대한 설명
    - 사용 대상 : Method(함수)
    - code : HTTP 응답 코드
    - message : 응답과 함께 제공되는 사람이 읽을 수 있는 메시지.
    - 응답이 여러개일 경우 : @ApiResponses(value = {@ApiResponse(), @ApiResponse()})의 형태로 사용.
  - `@ApiModel` : 모델(dto)에 대한 설명
    - 사용 대상 : DTO Class
    - value : 모델에 대한 간단한 설명.
    - description : 모델에 대한 자세한 설명.
  - `@ApiModelProperty` : 모델의 속성에 대한 설명
    - 사용 대상 : DTO Class의 속성.
    - value : 속성에 대한 간단한 설명.
  - `@ApiIgnore` : 정보 숨기기.
    - 클래스, 메소드, 매개변수 모두 사용 가능.

## 프로젝트 구조
```
main
├─java
│  └─com
│      └─server
│          └─back
│	          ├─common
│	          │  ├─auth
│   	      │  │  ├─dto
│       	  │  │  ├─entity
│	          │  │  ├─repository
│		      │  │  └─service
│	          │  ├─dto
│	          │  ├─entity
│	          │  └─repository
│	          ├─config
│	          ├─domain
│	          │  ├─user
│	          │  │  ├─controller
│	          │  │  ├─dto
│	          │  │  ├─entity
│	          │  │  ├─repository
│	          │  │  └─service
│	          │  │
│	          │  ├─study
│	          │  │  ├─controller
│	          │  │  ├─dto
│	          │  │  ├─entity
│	          │  │  ├─repository
│	          │  │  └─service
│	          │  │
│	          │  ├─dict
│	          │  │  ├─controller
│	          │  │  ├─dto
│	          │  │  ├─entity
│	          │  │  ├─repository
│	          │  │  └─service
│	          │  │
│	          │  ├─customer service
│	          │  │  ├─controller
│	          │  │  ├─dto
│	          │  │  ├─entity
│	          │  │  ├─repository
│	          │  │  └─service
│	          │  │
│	          │  └─admin
│	          │     ├─controller
│	          │     ├─dto
│	          │     ├─entity
│	          │     ├─repository
│	          │     └─service
│	          │   
│	          │
│	          ├─exception
│	          │
│	          └─security
│             
│
└─resources
   ├─static
   └─templates
```
