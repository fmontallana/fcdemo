
const styles = {
    boxWidth: "xl:max-w-[1280px] w-full",

    heading2: "font-poppins font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full",
    paragraph: "font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px]",

    flexCenter: "flex justify-center items-center",
    flexStart: "flex justify-center items-start",

    paddingX: "sm:px-16 lg:px-32 px-8",
    paddingY: "sm:py-16 lg:py-32 py-8",
    padding: "sm:px-16 px-6 sm:py-12 py-4",

    marginX: "sm:mx-16 mx-6",
    marginY: "sm:my-16 my-6",

    bg_niagara: "bg-teal-600",
    bg_wildRice: "bg-amber-200",
    bg_tealBlue: "bg-lightBlue-900",
    bg_casal: "bg-cyan-800",
    bg_accent: "bg-red-500",

    text_niagara: "text-teal-600",
    text_wildRice: "text-amber-200",
    text_tealBlue: "text-lightBlue-900",
    text_casal: "text-cyan-800",
    text_accent: "text-red-500",

    gradientFromTo: "from-teal-600 to-cyan-800",
    btnSmall: `bg-red-500 text-white rounded-full px-6 py-2 shadow-md font-sans font-semibold`,
    text_red: "text-red-500",
    text_blue: "text-blue-500",
    text_green: "text-green-500",
    text_yellow: "text-yellow-500",
    bg_red: "bg-red-500",
    bg_blue: "bg-blue-500",
    bg_green: "bg-green-500",
    bg_yellow: "bg-yellow-500",
};

export const layout = {
    section: `flex md:flex-row flex-col ${styles.paddingY}`,
    sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,

    sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
    sectionImg: `flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,

    sectionInfo: `flex-1 ${styles.flexStart} flex-col`,
};

export default styles;