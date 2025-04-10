// portone.d.ts
// 참고한 링크들
// https://github.com/junhoyeo/iamport-typings
// 공식문서

export interface RequestPayAdditionalResponse {
  /**
   * ### 신용카드 승인번호
   * - 신용카드 결제수단에 한하여 제공
   */
  apply_num?: string;
  /**
   * ### 가상계좌 입금 계좌번호
   * - PG사로부터 전달된 정보 그대로 제공에 따라 숫자 외 dash(-) 또는 기타 기호가 포함되어 있을 수 있음
   */
  vbank_num?: string;
  /**
   * ### 가상계좌 입금은행 명
   */
  vbank_name?: string;
  /**
   * ### 가상계좌 예금주
   * - 계약된 사업자명으로 표시됨, 단, 일부 PG사의 경우 null 을 반환하므로 자체 처리 필요
   */
  vbank_holder?: string | null;
  /**
   * ### 가상계좌 입금기한 (UNIX timestamp)
   */
  vbank_date?: string;
}

export interface RequestPayResponse extends RequestPayAdditionalResponse {
  /**
   * ### 결제 성공여부
   * - 결제승인 혹은 가상계좌 발급이 성공한 경우, True\
   * - PG사/결제수단에 따라 imp_success로 반환됨
   */
  success?: boolean;
  /**
   * ### 결제 실패코드
   * - 결제가 실패하는 경우 PG사 원천코드가 내려갑니다.
   */
  error_code?: string;
  /**
   * ### 결제 실패메세지
   * - 결제가 실패하는 경우 PG사 원천메세지가 내려갑니다.
   */
  error_msg?: string;
  /**
   * ### 포트원 고유 결제번호
   * - success가 false이고 사전 validation에 실패한 경우, imp_uid는 null일 수 있음
   */
  imp_uid?: string | null;
  /** ### 주문번호 */
  merchant_uid: string;
  /** ### 결제수단 구분코드 */
  pay_method?: PaymentMethod;
  /** 결제금액 */
  paid_amount?: number;
  /** 결제상태 */
  status?: string;
  /** 주문자명 */
  name?: string;
  /** PG사 구분코드 */
  pg_provider?: PG;
  /**
   * ### 간편결제 구분코드
   * - 결제창에서 간편결제 호출시 결제 승인된 PG사 구분코드
   * - 일부 PG사 또는 간편결제로 결제가 발생되지 않은 경우 해당 파라미터는 생략됩니다.
   */
  embb_pg_provider?:
    | "naverpay"
    | "kakaopay"
    | "payco"
    | "samsungpay"
    | "ssgpay"
    | "lpay";
  /**
   * ### PG사 거래번호
   * - PG사에서 거래당 고유하게 부여하는 거래번호입니다.
   */
  pg_tid?: string;
  /** ### 주문자명 */
  buyer_name?: string;
  /** ### 주문자 이메일 */
  buyer_email?: string;
  /** ### 주문자 연락처 */
  buyer_tel?: string;
  /** ### 주문자 주소 */
  buyer_addr?: string;
  /** ### 주문자 우편번호 */
  buyer_postcode?: string;
  /** ### 가맹점 임의 지정 데이터 */
  custom_data?: string;
  /** ### 결제승인시각 (UNIX timestamp) */
  paid_at?: string;
  /** ### 거래 매출전표 URL */
  receipt_url?: string;
}

export type RequestPayResponseCallback = (response: RequestPayResponse) => void;

type PaypalUI = "paypal-spb" | "paypal-rt";

export interface PaypalRequestPayParams extends RequestPayParams {
  pg: string;
  pay_method: "paypal";
  /**
   * ### 국가코드
   * - 주의: 페이팔 일반결제 테스트 모드시에만 유효
   */
  country?: string;
  /**
   * ### 구매자 이름 주의:
   * - 페이팔에서만 유효하며 buyer_name이 아닌 buyer_first_name과 buyer_last_name 입력을 권장
   */
  buyer_first_name?: string;
  /**
   * ### 구매자 이름 주의:
   * - 페이팔에서만 유효하며 buyer_name이 아닌 buyer_first_name과 buyer_last_name 입력을 권장
   */
  buyer_last_name?: string;
  /**
   * ### 결제 상품 정보
   * - 구매 상품 상세 정보를 의미하며 전달 한 값 중 name(상품 명), quantity(상품 수량), unitPrice(상품 단위 금액)만 결제창에 표기됩니다.
   * - 페이팔은 해당 파라미터 입력을 강력 권장하고 있으니, 되도록 입력해주시기 바랍니다.
   * - 각 상품의 수량 * 단위 가격의 총 합이 주문 총 금액과 반드시 일치해야합니다. 일치하지 않는 경우 에러 메시지가 리턴되면서 결제창이 호출되지 않습니다.
   */
  products?: {
    id?: string;
    name?: string;
    code?: string;
    unitPrice?: number;
    quantity?: number;
    tag?: string;
  }[];
  /**
   * ### 결제 통화
   * @default USD
   */
  currency?: string;
}

export interface Iamport {
  init: (accountID: string) => void;
  request_pay: (
    params: RequestPayParams,
    callback?: RequestPayResponseCallback
  ) => void;
  loadUI: (
    type: PaypalUI,
    params: PaypalRequestPayParams,
    callback?: RequestPayResponseCallback
  ) => void;
  updateLoadUIRequest: (type: PaypalUI, params: PaypalRequestPayParams) => void;
}

declare global {
  interface Window {
    IMP?: Iamport;
  }
}
