import MateCard from "./MateCard";

const mateCardsData = [
  {
    imageSrc: "/reservationImg/mateCardTest.webp",
    title: "5월에 같이 제주도 가실 분",
    nickName: "여행자1",
    startDate: "25.05.01",
    endDate: "25.05.02",
    location: "제주도",
  },
  {
    imageSrc: "/reservationImg/mateCardTest.webp",
    title: "4월에 같이 서울을 여행할 분",
    nickName: "여행자2",
    startDate: "25.04.10",
    endDate: "25.04.12",
    location: "서울",
  },
  {
    imageSrc: "/reservationImg/mateCardTest.webp",
    title: "6월에 부산 바다를 함께 갈 친구",
    nickName: "여행자3",
    startDate: "25.06.15",
    endDate: "25.06.16",
    location: "부산",
  },
  {
    imageSrc: "/reservationImg/mateCardTest.webp",
    title: "강원도에서 힐링할 동반자 구합니다",
    nickName: "여행자4",
    startDate: "25.07.01",
    endDate: "25.07.03",
    location: "강원도",
  },
];

export default function ReservationMateSection() {
  return (
    <>
      <section className="flex gap-10 w-full h-90 my-20">
        <div className="w-96">
          <div className="font-paperlogy text-6xl">#같이 가요</div>
          <div className="text-2xl font-semibold mt-4 mb-15">
            플래닛으로 구하는 여행메이트
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="336"
            height="200"
            viewBox="0 0 336 200"
            fill="none"
            className="ml-12"
          >
            <g clipPath="url(#clip0_280_2294)">
              <path
                d="M36.4991 141.043C35.0479 141.199 33.4636 141.434 31.7782 141.779C24.6373 143.236 24.4858 148.091 24.5501 149.203L24.4995 149.171C23.7832 150.325 23.3331 151.493 23.0576 152.592L22.7315 137.71C22.9428 137.269 23.1357 136.768 23.2964 136.257C23.8291 137.908 24.7062 139.462 25.4639 139.36C26.4467 139.227 26.8737 136.331 26.69 134.276C27.9391 135.885 30.0424 137.609 30.8368 137.076C31.4706 136.653 31.094 134.906 30.4052 133.315C31.8471 134.184 33.4452 134.754 33.9412 134.202C34.6162 133.448 32.9952 130.878 31.5027 129.444C33.5003 129.632 36.0444 129.311 36.2143 128.4C36.3521 127.651 34.8367 126.704 33.2156 126.092C34.8413 125.665 36.3659 124.915 36.3154 124.175C36.2557 123.297 33.9963 122.704 32.0446 122.617C33.5141 121.467 34.8642 119.872 34.4509 119.155C34.0698 118.493 32.3064 118.75 30.6761 119.334C31.6405 117.955 32.3201 116.396 31.8012 115.863C31.1583 115.201 28.8759 116.346 27.3146 117.61C27.6177 115.638 27.4661 113.151 26.5798 112.925C25.8405 112.737 24.7935 114.185 24.0771 115.762C23.7602 114.107 23.1173 112.535 22.3779 112.535C21.3217 112.535 20.4676 115.721 20.4676 117.799C20.4676 117.918 20.4676 118.029 20.4768 118.134C20.3711 118.01 20.2471 117.881 20.1094 117.748C18.6215 116.3 15.7422 114.695 15.0028 115.454C14.4885 115.987 15.1635 117.541 16.1279 118.925C14.4977 118.341 12.7297 118.084 12.3531 118.746C11.8434 119.633 14.0247 121.854 15.7973 122.929C15.6916 122.916 15.5768 122.906 15.4574 122.897C13.3863 122.755 10.1534 123.394 10.0799 124.447C10.0294 125.187 11.5495 125.936 13.1797 126.364C11.5586 126.975 10.0478 127.922 10.181 128.672C10.3463 129.582 12.8904 129.904 14.8926 129.715C13.4001 131.15 11.7791 133.719 12.4541 134.473C12.9501 135.025 14.5482 134.455 15.9901 133.586C15.2967 135.177 14.9247 136.924 15.5585 137.347C16.3943 137.908 18.695 135.954 19.9027 134.276C19.7787 136.331 20.2701 139.154 21.2437 139.264C21.6524 139.31 22.084 138.873 22.4744 138.207L21.3722 154.201C21.1151 156.063 22.7637 157.281 22.9106 158.044L23.1494 168.876C22.8785 168.103 22.5203 167.313 22.0289 166.531L21.9784 166.563C22.0427 165.451 21.8912 160.596 14.7502 159.138C13.0649 158.794 11.4806 158.559 10.0294 158.403C8.31652 158.219 7.64605 160.568 9.19364 161.327C11.4346 162.426 13.5425 163.809 14.6446 165.446C17.4551 169.634 21.3355 167.216 21.8912 166.839C22.5065 167.869 22.9106 168.903 23.1678 169.887L23.2964 175.638C23.2642 175.776 23.2459 175.85 23.2413 175.855L23.301 175.873L23.6087 189.794L26.4467 189.771L25.4318 175.542C25.6017 174.774 26.1252 172.158 25.4318 169.446L24.4169 158.265L23.0943 153.87C23.2872 152.509 23.7326 150.983 24.6419 149.47C25.193 149.847 29.078 152.27 31.8885 148.077C32.986 146.44 35.0984 145.057 37.3394 143.958C38.887 143.199 38.2211 140.85 36.5037 141.034L36.4991 141.043ZM23.5352 173.979L23.4801 171.542C23.5857 172.462 23.5811 173.294 23.5352 173.979Z"
                fill="#F2F2F2"
              />
              <path
                d="M0 190.465C0 190.768 0.243388 191.012 0.546476 191.012H335.454C335.757 191.012 336 190.768 336 190.465C336 190.162 335.757 189.918 335.454 189.918H0.546476C0.243388 189.918 0 190.162 0 190.465Z"
                fill="#090814"
              />
              <path
                d="M203.243 190.948C216.939 190.948 228.041 179.833 228.041 166.122C228.041 152.411 216.939 141.296 203.243 141.296C189.548 141.296 178.445 152.411 178.445 166.122C178.445 179.833 189.548 190.948 203.243 190.948Z"
                fill="#090814"
              />
              <path
                d="M203.243 182.673C212.373 182.673 219.775 175.263 219.775 166.122C219.775 156.981 212.373 149.571 203.243 149.571C194.113 149.571 186.711 156.981 186.711 166.122C186.711 175.263 194.113 182.673 203.243 182.673Z"
                fill="white"
              />
              <path
                d="M203.243 175.547C208.442 175.547 212.657 171.327 212.657 166.122C212.657 160.917 208.442 156.697 203.243 156.697C198.044 156.697 193.829 160.917 193.829 166.122C193.829 171.327 198.044 175.547 203.243 175.547Z"
                fill="#090814"
              />
              <path
                d="M59.9654 190.948C73.661 190.948 84.7635 179.833 84.7635 166.122C84.7635 152.411 73.661 141.296 59.9654 141.296C46.2698 141.296 35.1674 152.411 35.1674 166.122C35.1674 179.833 46.2698 190.948 59.9654 190.948Z"
                fill="#090814"
              />
              <path
                d="M59.9654 182.673C69.0958 182.673 76.4974 175.263 76.4974 166.122C76.4974 156.981 69.0958 149.571 59.9654 149.571C50.835 149.571 43.4333 156.981 43.4333 166.122C43.4333 175.263 50.835 182.673 59.9654 182.673Z"
                fill="white"
              />
              <path
                d="M237.166 154.316C233.938 146.165 222.65 121.261 202.545 113.017C202.389 112.953 202.228 112.912 202.063 112.889L137.583 103.643C136.523 103.492 135.531 104.218 135.361 105.28L134.231 112.268C134.153 112.746 134.254 113.238 134.516 113.647C137.79 118.732 158.777 153.254 125.171 153.254C91.5646 153.254 82.302 129.177 80.8325 124.925C80.6948 124.525 80.6902 124.093 80.8142 123.688L90.9997 91.3913C91.1788 90.8166 91.0824 90.2281 90.7885 89.7592L95.2659 81.4333L103.468 86.0813L107.715 86.1319L122.213 93.7176L125.166 88.8903L95.2659 73.958C95.2659 73.958 95.3164 70.5007 85.6727 67.7423L70.5184 60.8462L68.6815 63.1449L73.2737 66.8228L73.7329 69.5812L76.9475 70.5007L83.3766 82.9137L81.5397 86.4721L83.7716 87.5617L83.1332 87.4145C82.2102 87.203 81.2688 87.6812 80.8922 88.5501L70.7618 111.795C70.6056 112.149 70.3485 112.452 70.0224 112.663L66.4129 114.994C66.0777 115.21 65.8113 115.528 65.6598 115.9L61.536 125.909C61.4074 126.221 61.3706 126.548 61.4028 126.865C56.2641 127.839 41.1602 132.051 32.8621 148.661L42.5058 156.477C42.5058 156.477 57.6234 146.684 82.6051 156.881C86.9494 163.648 93.2821 169.262 102.43 169.791C126.544 171.188 166.496 172.567 171.088 167.051C174.45 163.009 176.787 160.49 177.802 159.428C178.16 159.056 178.647 158.84 179.161 158.821L235.393 157.024C236.757 156.982 237.662 155.594 237.161 154.325L237.166 154.316Z"
                fill="#89ADEF"
              />
              <path
                d="M82.0081 81.9895C86.0661 81.9895 89.3557 78.6962 89.3557 74.6337C89.3557 70.5711 86.0661 67.2778 82.0081 67.2778C77.9501 67.2778 74.6605 70.5711 74.6605 74.6337C74.6605 78.6962 77.9501 81.9895 82.0081 81.9895Z"
                fill="#090814"
              />
              <path
                d="M199.675 113.05C199.588 113.05 199.5 113.05 199.413 113.045L137.978 110.664C135.26 110.558 132.931 108.825 132.045 106.25L131.205 103.8C130.52 101.804 130.819 99.662 132.022 97.9288C133.23 96.1956 135.131 95.175 137.239 95.1244L200.713 93.6624C202.678 93.6165 204.57 94.4578 205.851 95.9749C207.133 97.4921 207.656 99.4781 207.284 101.432L206.086 107.721C205.493 110.843 202.816 113.045 199.67 113.045L199.675 113.05Z"
                fill="#090814"
              />
              <path
                d="M59.9654 175.547C65.1646 175.547 69.3794 171.327 69.3794 166.122C69.3794 160.917 65.1646 156.697 59.9654 156.697C54.7661 156.697 50.5513 160.917 50.5513 166.122C50.5513 171.327 54.7661 175.547 59.9654 175.547Z"
                fill="#090814"
              />
              <path
                d="M224.358 139.292C222.889 139.292 221.488 138.505 220.74 137.149L216.088 128.718C215.348 127.38 215.394 125.812 216.202 124.52C217.011 123.224 218.407 122.497 219.922 122.58L228.367 123.012C229.938 123.095 231.352 124.083 231.968 125.536L234.434 131.375C234.884 132.446 234.874 133.614 234.401 134.676C233.928 135.733 233.065 136.529 231.972 136.906L225.718 139.066C225.272 139.223 224.813 139.296 224.363 139.296L224.358 139.292Z"
                fill="#090814"
              />
              <path
                d="M117.566 195.329C117.497 195.329 117.423 195.329 117.355 195.315L115.481 195.108C114.87 195.039 114.337 194.694 114.025 194.161C113.713 193.628 113.672 192.998 113.91 192.428L123.664 169.239C123.931 168.604 124.523 168.154 125.207 168.066C125.873 167.984 126.521 168.246 126.948 168.765C127.37 169.285 127.499 169.974 127.283 170.609L119.407 194.005C119.141 194.796 118.388 195.324 117.57 195.324L117.566 195.329Z"
                fill="#090814"
              />
              <path
                d="M168.204 33.5056C168.204 33.5056 164.636 26.3612 165.348 19.9341L153.473 26.0946L153.932 37.7904L168.204 33.5056Z"
                fill="#DA8A8D"
              />
              <path
                d="M160.834 29.3953C166.751 29.3953 171.547 24.5932 171.547 18.6696C171.547 12.7459 166.751 7.94385 160.834 7.94385C154.917 7.94385 150.12 12.7459 150.12 18.6696C150.12 24.5932 154.917 29.3953 160.834 29.3953Z"
                fill="#DA8A8D"
              />
              <path
                d="M171.777 187.081H165.238L162.129 161.837H171.777V187.081Z"
                fill="#DA8A8D"
              />
              <path
                d="M149.381 186.93C149.179 187.275 149.068 188.383 149.068 188.778C149.068 190.005 150.06 190.998 151.287 190.998H171.529C172.365 190.998 173.045 190.318 173.045 189.481V188.635C173.045 188.635 174.046 186.098 171.984 182.976C171.984 182.976 169.421 185.422 165.591 181.592L164.462 179.546L156.287 185.532L151.755 186.088C150.763 186.213 149.886 186.07 149.376 186.93L149.381 186.93Z"
                fill="#090814"
              />
              <path
                d="M152.503 33.5052L168.204 31.3628L180.337 37.0774L181.049 81.3686C181.049 81.3686 151.208 84.9408 146.506 80.2975C141.804 75.6541 145.372 38.5071 145.372 38.5071L152.508 33.5052L152.503 33.5052Z"
                fill="#89ADEF"
              />
              <path
                d="M158.152 21.4006H155.273C155.273 21.4006 152.774 18.3203 153.11 20.1961C153.445 22.0718 152.099 24.0901 152.099 24.0901L150.083 23.4188C150.083 23.4188 146.051 6.44066 158.152 5.50739C170.253 4.57412 172.944 13.9988 172.944 13.9988C172.944 13.9988 172.273 18.7111 170.928 17.3641C169.582 16.017 162.189 15.3458 162.189 15.3458L158.157 21.4052L158.152 21.4006Z"
                fill="#090814"
              />
              <path
                d="M150.533 181.408L144.247 183.183L134.401 159.741L143.686 157.116L150.533 181.408Z"
                fill="#DA8A8D"
              />
              <path
                d="M128.941 187.357C128.84 187.744 129.037 188.838 129.143 189.224C129.473 190.405 130.7 191.09 131.88 190.759L151.36 185.252C152.164 185.026 152.632 184.185 152.407 183.381L152.177 182.567C152.177 182.567 152.453 179.854 149.62 177.409C149.62 177.409 147.819 180.461 143.094 177.813L141.45 176.149L135.209 184.13L131.003 185.9C130.084 186.286 129.198 186.392 128.941 187.357Z"
                fill="#090814"
              />
              <path
                d="M178.904 77.084L181.044 83.5663V105.841L174.62 173.073H162.074L160.659 125.081L161.775 101.377L137.845 137.622L148.361 163.51L136.784 171.239C136.784 171.239 119.472 131.742 122.062 127.913C124.652 124.088 147.852 78.9092 147.852 78.9092C147.852 78.9092 178.895 77.8012 178.895 77.0886L178.904 77.084Z"
                fill="#090814"
              />
              <path
                d="M185.329 51.3662L188.778 57.021C188.778 57.021 193.655 76.2105 188.778 76.2887C183.901 76.3668 174.055 66.51 174.055 66.51L175.341 61.3655L178.909 62.7953L178.197 51.3662H185.333H185.329Z"
                fill="#DA8A8D"
              />
              <path
                d="M174.624 36.9903C174.624 36.9903 186.041 34.9766 187.111 42.4566C188.181 49.9366 188.778 57.0257 188.778 57.0257L176.406 58.051L174.624 36.9903Z"
                fill="#89ADEF"
              />
              <path
                d="M271.162 141.043C269.711 141.199 268.127 141.434 266.441 141.779C259.301 143.236 259.149 148.091 259.213 149.203L259.163 149.171C258.446 150.325 257.996 151.493 257.721 152.592L257.395 137.71C257.606 137.269 257.799 136.768 257.96 136.257C258.492 137.908 259.369 139.462 260.127 139.36C261.11 139.227 261.537 136.331 261.353 134.276C262.602 135.885 264.706 137.609 265.5 137.076C266.134 136.653 265.757 134.906 265.068 133.315C266.51 134.184 268.108 134.754 268.604 134.202C269.279 133.448 267.658 130.878 266.166 129.444C268.164 129.632 270.708 129.311 270.878 128.4C271.015 127.651 269.5 126.704 267.879 126.092C269.504 125.665 271.029 124.915 270.979 124.175C270.919 123.297 268.659 122.704 266.708 122.617C268.177 121.467 269.527 119.872 269.114 119.155C268.733 118.493 266.97 118.75 265.339 119.334C266.304 117.955 266.983 116.396 266.464 115.863C265.821 115.201 263.539 116.346 261.978 117.61C262.281 115.638 262.129 113.151 261.243 112.925C260.504 112.737 259.457 114.185 258.74 115.762C258.423 114.107 257.78 112.535 257.041 112.535C255.985 112.535 255.131 115.721 255.131 117.799C255.131 117.918 255.131 118.029 255.14 118.134C255.034 118.01 254.91 117.881 254.773 117.748C253.285 116.3 250.405 114.695 249.666 115.454C249.152 115.987 249.827 117.541 250.791 118.925C249.161 118.341 247.393 118.084 247.016 118.746C246.507 119.633 248.688 121.854 250.461 122.929C250.355 122.916 250.24 122.906 250.121 122.897C248.05 122.755 244.817 123.394 244.743 124.447C244.693 125.187 246.213 125.936 247.843 126.364C246.222 126.975 244.711 127.922 244.844 128.672C245.009 129.582 247.554 129.904 249.556 129.715C248.063 131.15 246.442 133.719 247.117 134.473C247.613 135.025 249.211 134.455 250.653 133.586C249.96 135.177 249.588 136.924 250.222 137.347C251.057 137.908 253.358 135.954 254.566 134.276C254.442 136.331 254.933 139.154 255.907 139.264C256.316 139.31 256.747 138.873 257.138 138.207L256.035 154.201C255.778 156.063 257.427 157.281 257.574 158.044L257.813 168.876C257.542 168.103 257.184 167.313 256.692 166.531L256.642 166.563C256.706 165.451 256.554 160.596 249.413 159.138C247.728 158.794 246.144 158.559 244.693 158.403C242.98 158.219 242.309 160.568 243.857 161.327C246.098 162.426 248.206 163.809 249.308 165.446C252.118 169.634 255.999 167.216 256.554 166.839C257.17 167.869 257.574 168.903 257.831 169.887L257.96 175.638C257.927 175.776 257.909 175.85 257.905 175.855L257.964 175.873L258.272 189.794L261.11 189.771L260.095 175.542C260.265 174.774 260.788 172.158 260.095 169.446L259.08 158.265L257.758 153.87C257.95 152.509 258.396 150.983 259.305 149.47C259.856 149.847 263.741 152.27 266.552 148.077C267.649 146.44 269.762 145.057 272.003 143.958C273.55 143.199 272.884 140.85 271.167 141.034L271.162 141.043ZM258.198 173.979L258.143 171.542C258.249 172.462 258.244 173.294 258.198 173.979Z"
                fill="#F2F2F2"
              />
              <path
                d="M238.112 188.065L243.049 186.999L241.281 167.441L234.002 169.014L238.112 188.065Z"
                fill="#DA8A8D"
              />
              <path
                d="M254.993 184.3C255.204 184.525 255.466 185.344 255.53 185.647C255.732 186.571 255.145 187.486 254.217 187.684L238.939 190.989C238.309 191.127 237.685 190.723 237.547 190.093L237.409 189.454C237.409 189.454 236.238 187.702 237.285 185.008C237.285 185.008 239.618 186.438 241.882 182.916L242.401 181.188L249.547 184.369L253.055 184.052C253.822 183.983 254.465 183.73 254.988 184.3L254.993 184.3Z"
                fill="#090814"
              />
              <path
                d="M246.938 186.571L251.053 183.647L241.744 166.361L235.669 170.673L246.938 186.571Z"
                fill="#DA8A8D"
              />
              <path
                d="M260.977 176.457C261.257 176.581 261.822 177.229 261.996 177.482C262.543 178.254 262.363 179.325 261.592 179.872L248.844 188.929C248.316 189.302 247.59 189.178 247.214 188.653L246.837 188.12C246.837 188.12 245.074 186.971 244.977 184.079C244.977 184.079 247.682 184.474 248.385 180.346L248.183 178.553L256.003 178.663L259.108 176.99C259.787 176.622 260.279 176.139 260.981 176.457H260.977Z"
                fill="#090814"
              />
              <path
                d="M187.639 89.8647C187.639 89.8647 179.965 100.31 195.312 112.056L226.654 102.029L215.458 78.6562L205.544 73.2129L187.634 89.8601L187.639 89.8647Z"
                fill="#090814"
              />
              <path
                d="M226.659 102.034L238.81 125.725L246.488 175.036L236.895 175.675L227.297 128.929L210.347 103.634L222.181 98.1909"
                fill="#090814"
              />
              <path
                d="M195.317 104.618V112.061L217.066 135.972C217.066 135.972 217.066 153.902 225.382 162.228L234.975 176.958L243.292 172.475L231.141 129.572L209.392 101.395L195.321 104.618L195.317 104.618Z"
                fill="#090814"
              />
              <path
                d="M210.77 30.8344L206.673 46.4701L191.055 43.3945C191.055 43.3945 201.953 32.1446 200.419 27.0186L210.774 30.8344H210.77Z"
                fill="#DA8A8D"
              />
              <path
                d="M198.835 33.1929L208.428 37.6753C208.428 37.6753 213.364 40.6958 213.456 42.7095C213.548 44.7231 212.905 54.3271 212.905 54.3271C212.905 54.3271 216.744 58.1705 214.186 65.8528L215.468 78.6611L186.683 94.0302L189.241 67.1354L187.96 42.1624L198.835 33.1975V33.1929Z"
                fill="#090814"
              />
              <path
                d="M190.224 106.071C191.349 108.65 193.59 110.162 195.23 109.445C196.869 108.728 197.287 106.057 196.167 103.478C195.73 102.439 195.055 101.524 194.192 100.802L189.292 89.9292L184.245 92.3382L189.609 102.802C189.549 103.924 189.76 105.045 190.224 106.071Z"
                fill="#DA8A8D"
              />
              <path
                d="M195.317 43.7623C195.317 43.7623 188.282 39.2799 185.724 44.4014C183.166 49.5229 177.407 75.7786 177.407 75.7786L185.724 100.752L193.397 97.5518L186.679 70.6755L195.312 43.7623L195.317 43.7623Z"
                fill="#090814"
              />
              <path
                d="M231.38 102.039C233.373 104.025 236.013 104.604 237.276 103.331C238.539 102.057 237.942 99.4228 235.949 97.4367C235.164 96.6322 234.195 96.0299 233.129 95.6759L224.574 87.373L220.767 91.4739L229.603 99.2205C229.961 100.287 230.571 101.253 231.38 102.034L231.38 102.039Z"
                fill="#DA8A8D"
              />
              <path
                d="M213.185 42.2314C213.185 42.2314 200.919 41.7303 200.423 47.4357C199.932 53.141 208.318 78.6014 208.318 78.6014L225.24 98.7518L231.196 92.9453L215.064 70.4364L213.19 42.2314L213.185 42.2314Z"
                fill="#090814"
              />
              <path
                d="M268.935 193.982C271.076 193.982 272.811 192.245 272.811 190.102C272.811 187.959 271.076 186.222 268.935 186.222C266.794 186.222 265.059 187.959 265.059 190.102C265.059 192.245 266.794 193.982 268.935 193.982Z"
                fill="#090814"
              />
              <path
                d="M274.101 200C276.242 200 277.977 198.263 277.977 196.12C277.977 193.977 276.242 192.24 274.101 192.24C271.961 192.24 270.225 193.977 270.225 196.12C270.225 198.263 271.961 200 274.101 200Z"
                fill="#090814"
              />
              <path
                d="M312.851 200C314.991 200 316.726 198.263 316.726 196.12C316.726 193.977 314.991 192.24 312.851 192.24C310.71 192.24 308.975 193.977 308.975 196.12C308.975 198.263 310.71 200 312.851 200Z"
                fill="#090814"
              />
              <path
                d="M279.777 138.055V95.9197C279.777 91.2028 283.717 90.035 288.429 90.035C290.739 90.035 291.859 89.7684 293.481 91.4142C295.102 93.0601 296.902 93.7451 296.865 96.0576L296.185 137.402L279.773 138.05L279.777 138.055ZM288.888 92.798C284.682 92.798 280.696 91.7131 280.696 95.9243V137.103L295.285 136.524L295.951 96.0484C295.983 93.9842 292.631 94.2692 291.189 92.798C289.742 91.3269 290.955 92.798 288.893 92.798L288.888 92.798Z"
                fill="#090814"
              />
              <path
                d="M268.242 137.545L267.654 183.578C267.645 184.171 267.787 184.755 268.062 185.279L272.407 193.495C273.045 194.704 274.322 195.435 275.686 195.375L313.829 193.693C315.78 193.605 317.291 191.95 317.204 189.996L314.811 137.434C314.724 135.545 313.172 134.055 311.28 134.055H271.773C269.84 134.055 268.264 135.614 268.237 137.549L268.242 137.545Z"
                fill="#CACACA"
              />
              <path
                d="M283.277 158.32L282.358 158.274L282.698 151.461C282.882 147.792 285.899 144.85 289.568 144.762L305.811 144.385C309.09 144.33 311.808 146.817 311.987 150.1L312.332 156.329L311.413 156.38L311.069 150.15C310.913 147.369 308.594 145.236 305.829 145.305L289.586 145.682C286.395 145.755 283.773 148.316 283.612 151.507L283.272 158.32L283.277 158.32Z"
                fill="#090814"
              />
              <path
                d="M282.629 191.32L281.715 191.228L283.694 171.892C284.062 168.315 287.042 165.497 290.629 165.336L306.472 164.623C308.47 164.531 310.366 165.239 311.817 166.614C313.268 167.988 314.077 169.846 314.1 171.846L314.279 188.681L313.36 188.691L313.181 171.855C313.163 170.108 312.456 168.485 311.188 167.28C309.921 166.076 308.254 165.46 306.518 165.538L290.675 166.251C287.538 166.393 284.934 168.853 284.613 171.979L282.634 191.316L282.629 191.32Z"
                fill="#090814"
              />
              <path
                d="M275.53 189.982L274.611 189.968L275.19 145.778C275.231 142.758 277.624 140.321 280.641 140.229L311.868 139.31L311.895 140.229L280.668 141.149C278.143 141.222 276.14 143.259 276.108 145.787L275.53 189.977V189.982Z"
                fill="#090814"
              />
              <path
                d="M275.612 183.688H274.974V143.443C274.974 142.169 273.941 141.13 272.664 141.13H269.096V140.211H272.664C274.349 140.211 275.736 141.512 275.878 143.158C275.888 143.25 275.892 143.346 275.892 143.443V162.499L275.612 183.688Z"
                fill="#090814"
              />
              <path
                d="M217.438 22.4762C217.438 28.3701 212.666 33.1468 206.779 33.1468C200.892 33.1468 196.121 28.3701 196.121 22.4762C196.121 16.5824 200.892 11.8057 206.779 11.8057C212.666 11.8057 217.438 16.5824 217.438 22.4762Z"
                fill="#DA8A8D"
              />
              <path
                d="M205.93 8.13237C206.237 8.31166 206.651 8.04042 206.752 7.69561C206.853 7.35081 206.733 6.98761 206.623 6.64741C206.43 6.07733 206.242 5.51185 206.049 4.94177C205.64 3.73266 205.209 2.48217 204.327 1.56269C202.995 0.174277 200.874 -0.179722 198.968 0.077732C196.52 0.408744 194.105 1.73279 192.966 3.93035C191.827 6.1279 192.314 9.18977 194.371 10.5598C191.436 13.9251 190.417 17.6766 190.578 22.136C190.738 26.6001 195.597 30.7056 198.766 33.8502C199.473 33.4226 200.116 31.409 199.725 30.678C199.335 29.947 199.895 29.1011 199.413 28.4253C198.931 27.754 198.527 28.8252 199.014 28.154C199.321 27.7311 198.123 26.761 198.577 26.5082C200.786 25.2852 201.521 22.5268 202.908 20.4166C204.584 17.8696 207.445 16.1456 210.48 15.8606C212.152 15.7043 213.915 15.9893 215.284 16.9594C216.652 17.9294 217.539 19.6626 217.222 21.3131C218.044 20.4764 218.453 19.2535 218.301 18.0903C218.145 16.9272 217.433 15.8514 216.418 15.2583C217.034 13.2217 216.505 10.877 215.077 9.3047C213.649 7.7278 207.858 7.99904 205.773 8.41281L205.934 8.13696L205.93 8.13237Z"
                fill="#090814"
              />
              <path
                d="M205.608 15.9204C202.848 16.2192 200.855 18.6145 199.17 20.8258C198.201 22.0993 197.181 23.5061 197.209 25.1106C197.232 26.7289 198.316 28.1219 198.835 29.6528C199.68 32.163 198.858 35.1467 196.846 36.8661C198.835 37.2431 200.984 35.7536 201.324 33.7537C201.723 31.432 199.964 29.1885 200.171 26.8392C200.355 24.7704 201.985 23.1797 203.367 21.6304C204.754 20.0811 206.054 18.0306 205.415 16.0537L205.608 15.9204Z"
                fill="#090814"
              />
              <path
                d="M149.282 86.5858L133.172 72.8423C132.789 72.5158 132.759 71.9202 133.104 71.5144L159.195 40.8618C159.541 40.4561 160.133 40.3915 160.516 40.7179L176.626 54.4615C177.008 54.7879 177.038 55.3836 176.693 55.7893L150.602 86.4419C150.256 86.8477 149.664 86.9123 149.282 86.5858Z"
                fill="white"
              />
              <path
                d="M149.282 86.5858L133.172 72.8423C132.789 72.5158 132.759 71.9202 133.104 71.5144L159.195 40.8618C159.541 40.4561 160.133 40.3915 160.516 40.7179L176.626 54.4615C177.008 54.7879 177.038 55.3836 176.693 55.7893L150.602 86.4419C150.256 86.8477 149.664 86.9123 149.282 86.5858Z"
                stroke="#2F2E41"
                stroke-miterlimit="10"
              />
              <path
                d="M141.519 42.4888L135.035 43.8312C135.035 43.8312 117.704 53.38 120.982 56.9981C124.257 60.6163 138.176 61.0806 138.176 61.0806L141.05 56.6258L137.57 54.9937L146.396 47.7068L141.519 42.4888Z"
                fill="#DA8A8D"
              />
              <path
                d="M159.318 40.4889C159.318 40.4889 152.986 30.7655 146.8 35.0962C140.614 39.4269 135.039 43.8312 135.039 43.8312L142.745 53.5731L159.323 40.4889H159.318Z"
                fill="#89ADEF"
              />
              <path
                d="M149.177 60.9794C149.53 59.2324 146.989 57.2434 143.501 56.5368C140.014 55.8303 136.9 56.6737 136.547 58.4207C136.194 60.1678 138.735 62.1568 142.222 62.8633C145.71 63.5699 148.824 62.7264 149.177 60.9794Z"
                fill="#DA8A8D"
              />
              <path
                d="M177.104 65.884C178.137 64.4321 176.625 61.5799 173.727 59.5132C170.828 57.4466 167.641 56.9482 166.608 58.4001C165.576 59.8519 167.088 62.7041 169.986 64.7708C172.884 66.8374 176.071 67.3358 177.104 65.884Z"
                fill="#DA8A8D"
              />
            </g>
            <defs>
              <clipPath id="clip0_280_2294">
                <rect width="336" height="200" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="w-full flex gap-4">
          {mateCardsData.map((mate, index) => (
            <MateCard
              key={index}
              imageSrc={mate.imageSrc}
              title={mate.title}
              nickName={mate.nickName}
              startDate={mate.startDate}
              endDate={mate.endDate}
              location={mate.location}
            />
          ))}
        </div>
      </section>
    </>
  );
}
