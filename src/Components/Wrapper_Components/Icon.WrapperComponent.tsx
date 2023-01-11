import React from "react";
import { SvgIcon, SxProps, Theme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface IconProps {
  type: "delete" | "phone" | "mail" | "calendar" | "docx" | "pdf" | "info";
  style?: SxProps<Theme>;
}

const Icon: React.FC<IconProps> = (props) => {
  if (props.type === "delete") {
    return <DeleteIcon sx={props.style} />;
  }

  if (props.type === "info") {
    return <InfoOutlinedIcon sx={props.style} />;
  }

  if (props.type === "mail") {
    return (
      <SvgIcon sx={props.style} viewBox={"0 0 83 84"}>
        <path
          d="M14.2002 14.7383H69.2397C73.0237 14.7383 76.1196 17.8343 76.1196 21.6182V62.8978C76.1196 66.6818 73.0237 69.7777 69.2397 69.7777H14.2002C10.4163 69.7777 7.32031 66.6818 7.32031 62.8978V21.6182C7.32031 17.8343 10.4163 14.7383 14.2002 14.7383Z"
          stroke="#2D3E5B"
          stroke-width="6.87993"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M76.1196 21.6182L41.72 45.6979L7.32031 21.6182"
          stroke="#2D3E5B"
          stroke-width="6.87993"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </SvgIcon>
    );
  }

  if (props.type === "phone") {
    return (
      <SvgIcon sx={props.style} viewBox={"0 0 83 83"}>
        <path
          d="M65.1128 49.2951V58.6165C65.1163 59.4818 64.9387 60.3383 64.5914 61.1312C64.244 61.9241 63.7345 62.6358 63.0956 63.2208C62.4567 63.8058 61.7024 64.2512 60.8811 64.5284C60.0597 64.8056 59.1894 64.9086 58.3258 64.8307C48.7457 63.7918 39.5433 60.5247 31.4581 55.2918C23.9359 50.5214 17.5583 44.1564 12.7784 36.6491C7.51686 28.5433 4.2425 19.3144 3.22058 9.71035C3.14278 8.85113 3.2451 7.98515 3.52102 7.16756C3.79693 6.34996 4.24041 5.59866 4.8232 4.96149C5.40599 4.32432 6.11533 3.81524 6.90607 3.46666C7.6968 3.11808 8.5516 2.93764 9.41603 2.93682H18.7559C20.2668 2.92198 21.7316 3.45596 22.8772 4.43922C24.0228 5.42248 24.771 6.78794 24.9825 8.28108C25.3767 11.2641 26.1078 14.1931 27.1618 17.0121C27.5807 18.1242 27.6713 19.3328 27.423 20.4948C27.1747 21.6568 26.5979 22.7233 25.7608 23.5681L21.8069 27.5142C26.2389 35.293 32.6924 41.7337 40.4867 46.1569L44.4405 42.2109C45.287 41.3755 46.3557 40.7998 47.52 40.5519C48.6842 40.3041 49.8953 40.3946 51.0096 40.8126C53.8342 41.8646 56.769 42.5942 59.7579 42.9876C61.2703 43.2006 62.6514 43.9608 63.6388 45.1238C64.6261 46.2867 65.1507 47.7713 65.1128 49.2951Z"
          stroke="#2D3E5B"
          stroke-width="5.50395"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </SvgIcon>
    );
  }

  if (props.type === "calendar") {
    return (
      <SvgIcon sx={props.style} viewBox={"0 0 84 84"}>
        <path
          d="M66.1176 14.2305H17.9581C14.1584 14.2305 11.0781 17.3107 11.0781 21.1104V69.2699C11.0781 73.0696 14.1584 76.1499 17.9581 76.1499H66.1176C69.9173 76.1499 72.9975 73.0696 72.9975 69.2699V21.1104C72.9975 17.3107 69.9173 14.2305 66.1176 14.2305Z"
          stroke="#2D3E5B"
          stroke-width="6.87993"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M55.7969 7.34961V21.1095"
          stroke="#2D3E5B"
          stroke-width="6.87993"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M28.2812 7.34961V21.1095"
          stroke="#2D3E5B"
          stroke-width="6.87993"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11.0781 34.8691H72.9975"
          stroke="#2D3E5B"
          stroke-width="6.87993"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </SvgIcon>
    );
  }

  if (props.type === "docx") {
    return (
      <SvgIcon sx={props.style} viewBox={"0 0 18 24"}>
        <path
          d="M3 24H15C16.6569 24 18 22.6626 18 21.0057V7C18 6.98098 17.3411 6.66341 16.8256 6.00969C16.578 5.69572 16.342 5.36607 16.0415 5.10235C12.8275 2.28229 11.0193 0 11 0H5.5H3C1.34315 0 0 1.34315 0 3V21C0 22.6569 1.34315 24 3 24Z"
          fill="#0263D1"
        />
        <path d="M18 7L11 0V7H18Z" fill="#4E92DF" />
        <path
          d="M3.90578 17H2.27344V12.7576H3.8892C4.3256 12.7576 4.70261 12.8425 5.02024 13.0124C5.33925 13.1809 5.58507 13.4239 5.75769 13.7415C5.9317 14.0578 6.0187 14.4369 6.0187 14.8788C6.0187 15.3207 5.93239 15.7005 5.75977 16.0181C5.58714 16.3344 5.3427 16.5774 5.02646 16.7473C4.71021 16.9158 4.33665 17 3.90578 17ZM3.42519 16.0223H3.86435C4.07426 16.0223 4.2531 15.9884 4.40086 15.9208C4.55001 15.8531 4.66325 15.7364 4.74059 15.5707C4.81931 15.4049 4.85867 15.1743 4.85867 14.8788C4.85867 14.5833 4.81862 14.3526 4.73852 14.1869C4.6598 14.0212 4.5438 13.9045 4.39051 13.8368C4.2386 13.7692 4.05216 13.7353 3.8312 13.7353H3.42519V16.0223ZM10.7198 14.8788C10.7198 15.3511 10.6279 15.7495 10.4443 16.074C10.2606 16.3972 10.0127 16.6423 9.7006 16.8094C9.3885 16.9751 9.04048 17.058 8.65657 17.058C8.26989 17.058 7.9205 16.9745 7.60839 16.8074C7.29767 16.6389 7.05047 16.3931 6.86679 16.0699C6.6845 15.7454 6.59336 15.3483 6.59336 14.8788C6.59336 14.4065 6.6845 14.0088 6.86679 13.6856C7.05047 13.3611 7.29767 13.1159 7.60839 12.9502C7.9205 12.7831 8.26989 12.6996 8.65657 12.6996C9.04048 12.6996 9.3885 12.7831 9.7006 12.9502C10.0127 13.1159 10.2606 13.3611 10.4443 13.6856C10.6279 14.0088 10.7198 14.4065 10.7198 14.8788ZM9.53488 14.8788C9.53488 14.6247 9.50105 14.4106 9.43338 14.2366C9.36709 14.0612 9.26835 13.9287 9.13715 13.8389C9.00734 13.7478 8.84715 13.7022 8.65657 13.7022C8.46599 13.7022 8.3051 13.7478 8.17391 13.8389C8.0441 13.9287 7.94535 14.0612 7.87769 14.2366C7.8114 14.4106 7.77825 14.6247 7.77825 14.8788C7.77825 15.1329 7.8114 15.3476 7.87769 15.523C7.94535 15.697 8.0441 15.8296 8.17391 15.9208C8.3051 16.0105 8.46599 16.0554 8.65657 16.0554C8.84715 16.0554 9.00734 16.0105 9.13715 15.9208C9.26835 15.8296 9.36709 15.697 9.43338 15.523C9.50105 15.3476 9.53488 15.1329 9.53488 14.8788ZM15.2717 14.3485H14.1034C14.0951 14.2518 14.073 14.1641 14.0371 14.0854C14.0026 14.0067 13.9542 13.939 13.8921 13.8824C13.8313 13.8244 13.7574 13.7802 13.6704 13.7498C13.5834 13.7181 13.4847 13.7022 13.3742 13.7022C13.1809 13.7022 13.0172 13.7491 12.8833 13.843C12.7507 13.9369 12.6499 14.0716 12.5808 14.247C12.5132 14.4224 12.4793 14.633 12.4793 14.8788C12.4793 15.1384 12.5139 15.3559 12.5829 15.5313C12.6533 15.7053 12.7548 15.8365 12.8874 15.9249C13.02 16.0119 13.1795 16.0554 13.3659 16.0554C13.4723 16.0554 13.5676 16.0423 13.6518 16.016C13.736 15.9884 13.8092 15.9491 13.8714 15.898C13.9335 15.8469 13.9839 15.7854 14.0226 15.7136C14.0626 15.6404 14.0896 15.5582 14.1034 15.4671L15.2717 15.4754C15.2579 15.6549 15.2075 15.8379 15.1205 16.0243C15.0335 16.2094 14.9099 16.3806 14.7497 16.5381C14.5909 16.6941 14.3941 16.8198 14.1593 16.9151C13.9245 17.0104 13.6518 17.058 13.3411 17.058C12.9516 17.058 12.6022 16.9745 12.2929 16.8074C11.9849 16.6403 11.7412 16.3944 11.5617 16.0699C11.3835 15.7454 11.2944 15.3483 11.2944 14.8788C11.2944 14.4065 11.3856 14.0088 11.5679 13.6856C11.7502 13.3611 11.996 13.1159 12.3053 12.9502C12.6147 12.7831 12.9599 12.6996 13.3411 12.6996C13.609 12.6996 13.8555 12.7362 14.0806 12.8094C14.3057 12.8826 14.5032 12.9896 14.673 13.1304C14.8429 13.2699 14.9796 13.4419 15.0832 13.6462C15.1868 13.8506 15.2496 14.0847 15.2717 14.3485Z"
          fill="white"
        />
      </SvgIcon>
    );
  }

  if (props.type === "pdf") {
    return (
      <SvgIcon sx={props.style} viewBox={"0 0 18 24"}>
        <path
          d="M3 24H15C16.6569 24 18 22.6626 18 21.0057V7C18 6.98098 17.3411 6.66341 16.8256 6.00969C16.578 5.69572 16.342 5.36607 16.0415 5.10235C12.8275 2.28229 11.0193 0 11 0H5.5H3C1.34315 0 0 1.34315 0 3V21C0 22.6569 1.34315 24 3 24Z"
          fill="#F15642"
        />
        <path d="M18 7L11 0V7H18Z" fill="#B0B7BD" />
        <path
          d="M3.27344 17V12.7576H5.10464C5.41951 12.7576 5.69502 12.8197 5.93117 12.944C6.16732 13.0683 6.35099 13.243 6.48219 13.4681C6.61338 13.6932 6.67898 13.9563 6.67898 14.2573C6.67898 14.5612 6.61131 14.8242 6.47597 15.0466C6.34201 15.2689 6.15351 15.4402 5.91045 15.5603C5.66878 15.6805 5.38636 15.7405 5.06321 15.7405H3.96946V14.8456H4.8312C4.96654 14.8456 5.08185 14.8222 5.17714 14.7752C5.27381 14.7269 5.3477 14.6585 5.39879 14.5701C5.45127 14.4818 5.47751 14.3775 5.47751 14.2573C5.47751 14.1358 5.45127 14.0322 5.39879 13.9466C5.3477 13.8596 5.27381 13.7933 5.17714 13.7478C5.08185 13.7008 4.96654 13.6773 4.8312 13.6773H4.42519V17H3.27344ZM8.79224 17H7.1599V12.7576H8.77566C9.21206 12.7576 9.58907 12.8425 9.9067 13.0124C10.2257 13.1809 10.4715 13.4239 10.6442 13.7415C10.8182 14.0578 10.9052 14.4369 10.9052 14.8788C10.9052 15.3207 10.8188 15.7005 10.6462 16.0181C10.4736 16.3344 10.2292 16.5774 9.91292 16.7473C9.59667 16.9158 9.22311 17 8.79224 17ZM8.31165 16.0223H8.75081C8.96072 16.0223 9.13956 15.9884 9.28732 15.9208C9.43647 15.8531 9.54971 15.7364 9.62705 15.5707C9.70577 15.4049 9.74512 15.1743 9.74512 14.8788C9.74512 14.5833 9.70508 14.3526 9.62498 14.1869C9.54626 14.0212 9.43026 13.9045 9.27697 13.8368C9.12506 13.7692 8.93862 13.7353 8.71766 13.7353H8.31165V16.0223ZM11.4964 17V12.7576H14.4793V13.6856H12.6481V14.4148H14.2971V15.3428H12.6481V17H11.4964Z"
          fill="white"
        />
      </SvgIcon>
    );
  }

  return null;
};

export default Icon;