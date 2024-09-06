const RESPONSE_CODE = {

    // Success
    SUCCESS : { "isSuccess": true, "code": 1000, "message":"요청성공.", "status": 200 },

    // Upload ERROR
    IMAG_UPLOAD_EXTENSION_ERROR: { "isSuccess": false, "code": 2000, "message":"이미지만 업로드할 수 있습니다.", "status": 400 },

    // Password ERROR
    PASSWORD_NOT_MATCH_ERROR: { "isSuccess": false, "code": 3000, "message":"비밀번호가 일치하지 않습니다.", "status": 400 },
    MEMBER_NOT_FOUND_ERROR: { "isSuccess": false, "code": 3001, "message":"존재하지 않는 사용자입니다.", "status": 400 },

    // Request ERROR
    REQUEST_BODY_FIELD_NOT_EXIST_ERROR: { "isSuccess": false, "code": 4000, "message":"Request Body에 특정 Field가 존재하지 않습니다.", "status": 400 },
    REQUEST_HEADER_FIELD_NOT_EXIST_ERROR: { "isSuccess": false, "code": 4001, "message":"Request Header에 특정 Field가 존재하지 않습니다.", "status": 400 },

    // DB ERROR
    DB_ERROR: { "isSuccess": false, "code": 5001, "message":"DB 에러입니다.", "status": 500 },

    // Service ERROR
    MEMBER_NICKNAME_ALREADY_EXIST_ERROR: {"isSuccess": false, "code": 6000, "message":"이미 존재하는 이름입니다.", "status": 400 },

    
  };
  
  export default RESPONSE_CODE;