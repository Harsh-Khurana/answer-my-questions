import { motion } from "motion/react"

export default function AnimatedAmqLogo() {
  const slide = {
    out: ({ xFrom }: { xFrom: number }) => ({ x: xFrom, opacity: 0 }),
    in: ({ i }: { i: number }) => {
      const delay = i * 0.5
      return {
        x: 0,
        opacity: 1,
        transition: {
          x: { delay, type: "spring" as const, duration: 1.5 },
        },
      }
    },
  }

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 161 86"
      fill="none"
      initial="out"
      animate="in"
    >
      <g filter="url(#filter0_d_9_12)">
        <motion.path
          d="M85.3281 74.7812C85.2969 75.1875 84.4375 75.3906 82.75 75.3906H78.4375L75.5312 75.4375H72.6719L68.125 75.4844C63.5938 75.4844 59.8281 75.375 56.8281 75.1562C56.7344 75.125 56.625 74.9375 56.5 74.5938L56.2656 73.6094C55.9844 70.3906 55.25 67.2812 54.0625 64.2812L34 64.4688C33.875 65 33.4688 66.5781 32.7812 69.2031C32.0938 71.8281 31.5781 73.8125 31.2344 75.1562C30.9219 75.4688 29.4375 75.625 26.7812 75.625L25.6094 75.5781H22.8906L10.7031 75.8594H9.29688L7.98438 75.9062H4.70312C4.48438 75.6875 4.25 75.4062 4 75.0625C7.125 64.25 11.3594 50.8438 16.7031 34.8438L17.7812 31.5156H17.7344L19 27.625C19.4062 26.375 20.5625 22.9062 22.4688 17.2188C24.4062 11.5313 25.6094 7.85937 26.0781 6.20312C26.5781 4.54688 26.875 3.6875 26.9688 3.625H34.75L51.3906 3.39062L55.8906 3.625L59.5938 3.39062C61.4688 3.39062 62.4062 3.76562 62.4062 4.51562C65.5312 13.2344 69.7031 25.7813 74.9219 42.1562C80.1406 58.5312 83.0781 67.7344 83.7344 69.7656L84.3906 72.1094C84.6094 72.9531 84.9219 73.8438 85.3281 74.7812ZM38.9219 49.1875L40.8438 49.2344L52.0469 49.1875C51.5781 45.4688 51.2188 42.7344 50.9688 40.9844L49.1875 32.9688C47.3125 24.6875 46.3438 20.4687 46.2812 20.3125C46.2188 20.1563 46.1562 20.0156 46.0938 19.8906C46.0625 19.7344 46.0312 19.6406 46 19.6094C45.9688 19.5469 45.9219 19.4531 45.8594 19.3281C45.8281 19.2031 45.7812 19.125 45.7188 19.0938C45.6875 19.0313 45.6406 18.9531 45.5781 18.8594C45.3594 18.4844 44.9062 18.1562 44.2188 17.875C43.375 18.0625 40.8594 27.4688 36.6719 46.0938L36.1562 49.1875H38.9219Z"
          fill="url(#paint0_linear_9_12)"
          variants={slide}
          custom={{ xFrom: -100, i: 1 }}
        />
      </g>
      <g filter="url(#filter1_d_9_12)">
        <motion.path
          d="M149.946 56.752L153.057 56.6562C155.226 56.752 156.311 57.4538 156.311 58.7617C156.311 58.7617 156.295 58.9372 156.263 59.2881V59.7666C156.231 59.9899 156.215 60.3727 156.215 60.915V62.6855L156.263 63.3076L156.311 67.9492L156.263 69.1934V71.5381L156.215 73.2129L156.263 74.0264V75.3662C156.135 75.8128 155.768 76.1797 155.162 76.4668C151.079 75.9564 146.979 75.7012 142.864 75.7012C138.749 75.7012 133.804 76.0202 128.03 76.6582C122.256 77.2962 117.965 77.6152 115.158 77.6152C108.427 77.6152 102.733 76.3073 98.0752 73.6914C93.4495 71.0436 89.5257 67.2314 86.3037 62.2549C85.889 62.2549 85.6816 62.2868 85.6816 62.3506L85.0117 61.6807C81.0879 55.5557 79.126 47.8356 79.126 38.5205C79.126 33.0973 79.8597 28.1846 81.3271 23.7822C84.0068 15.7432 88.9355 9.66602 96.1133 5.55078C102.493 1.85026 109.91 0 118.364 0C123.915 0 128.955 0.941081 133.485 2.82324C138.047 4.7054 141.827 7.30534 144.826 10.623C151.047 17.5137 154.157 26.1748 154.157 36.6064C154.157 39.9242 153.551 43.3854 152.339 46.9902C151.127 50.5951 149.452 53.849 147.314 56.752H149.946ZM115.828 60.4844L116.402 60.4365H117.264L118.221 60.5322C120.23 60.5322 121.841 59.8145 123.054 58.3789C124.266 56.9434 125.032 55.5397 125.351 54.168C126.212 50.7865 126.706 46.8945 126.834 42.4922V41.6309L126.978 35.4102C126.978 29.7637 126.403 25.6165 125.255 22.9688C124.106 20.321 122.559 18.5664 120.613 17.7051C119.465 17.1628 117.95 16.8916 116.067 16.8916C114.217 16.8916 112.526 17.6253 110.995 19.0928C109.464 20.5283 108.204 22.9368 107.215 26.3184C106.226 29.6999 105.731 33.9906 105.731 39.1904C105.731 44.3903 105.939 47.9154 106.354 49.7656C107.183 53.5938 108.315 56.3372 109.751 57.9961C111.218 59.6549 113.244 60.4844 115.828 60.4844Z"
          fill="url(#paint1_linear_9_12)"
          variants={slide}
          custom={{ xFrom: 100, i: 2 }}
        />
      </g>
      <g filter="url(#filter2_d_9_12)">
        <motion.path
          d="M83.8359 33.6719C86.7422 29.875 89.6406 27.9766 92.5312 27.9766C95.4219 27.9766 97.9688 29.0469 100.172 31.1875C101.25 32.25 101.977 33.4297 102.352 34.7266L102.516 35.3594C102.938 36.8281 103.148 37.7422 103.148 38.1016C103.148 38.4453 103.117 38.7266 103.055 38.9453C103.164 39.0391 103.219 39.1797 103.219 39.3672L103.172 40.2812C103.203 41.4062 103.219 42.1953 103.219 42.6484V57.0391H89.0156L88.9922 43.2578L89.0156 42.7422C89.0156 40.4766 88.3828 39.3438 87.1172 39.3438C85.6953 39.3438 84.9844 40.5938 84.9844 43.0938L85.0312 44.7109V57.0156L78.5156 57.0391H72.0234L72 44.4531L72.0469 42.9297C72.0469 40.8984 71.4219 39.6953 70.1719 39.3203C68.7031 39.3984 67.9688 40.5312 67.9688 42.7188L68.0156 44.125V57.0156L60.4688 57.0391H52.9688L52.9453 42.9531V28.9609L59.3672 28.9375H65.8125L65.9766 29.5C66.5547 31.5469 66.9922 33.1406 67.2891 34.2812C68.3047 32.5312 69.4844 31.0469 70.8281 29.8281C72.1875 28.5938 73.5391 27.9766 74.8828 27.9766C75.3047 27.9766 75.7266 27.9766 76.1484 27.9766C77.5078 27.9766 78.8984 28.5391 80.3203 29.6641C81.7422 30.7734 82.9141 32.1094 83.8359 33.6719Z"
          fill="url(#paint2_linear_9_12)"
          variants={{
            out: { scale: 0 },
            in: { scale: 1, transition: { delay: 1.5, duration: 0.5 } },
          }}
        />
      </g>
      <defs>
        <filter
          id="filter0_d_9_12"
          x="0"
          y="3.39062"
          width="89.3281"
          height="80.5156"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_9_12" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_9_12" result="shape" />
        </filter>
        <filter
          id="filter1_d_9_12"
          x="75.126"
          y="0"
          width="85.1846"
          height="85.6152"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_9_12" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_9_12" result="shape" />
        </filter>
        <filter
          id="filter2_d_9_12"
          x="49.9453"
          y="27.9766"
          width="58.2734"
          height="37.0625"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="1" dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_9_12" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_9_12" result="shape" />
        </filter>
        <linearGradient
          id="paint0_linear_9_12"
          x1="46.2812"
          y1="2.26562"
          x2="46.2813"
          y2="75.2656"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#353689" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_9_12"
          x1="116.281"
          y1="1.26562"
          x2="116.281"
          y2="75.2656"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#353689" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_9_12"
          x1="78.2812"
          y1="25.0156"
          x2="78.2812"
          y2="58.1789"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.225962" stopColor="#FB7185" />
          <stop offset="1" stopColor="#9D4B4B" />
        </linearGradient>
      </defs>
    </motion.svg>
  )
}
