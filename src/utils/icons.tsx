import { Icon } from "@chakra-ui/react";

import useIconFill from "hooks/useIconFill";

interface FillProps {
  fill?: string;
  boxSize?: string;
}

export const VisibleIcon = (props: FillProps) => {
  const activeFill = useIconFill(props);
  return (
    <Icon
      boxSize={props.boxSize ? props.boxSize : "24px"}
      viewBox="0 0 24 24"
      fill={activeFill}
    >
      <path d="M23.855 11.3917C21.5954 6.98292 17.1221 4 12 4C6.87792 4 2.40334 6.985 0.145002 11.3921C0.0496861 11.5806 2.47955e-05 11.7889 2.47955e-05 12.0002C2.47955e-05 12.2115 0.0496861 12.4198 0.145002 12.6083C2.40459 17.0171 6.87792 20 12 20C17.1221 20 21.5967 17.015 23.855 12.6079C23.9503 12.4194 24 12.2111 24 11.9998C24 11.7885 23.9503 11.5802 23.855 11.3917V11.3917ZM12 18C10.8133 18 9.65328 17.6481 8.66658 16.9888C7.67989 16.3295 6.91085 15.3925 6.45672 14.2961C6.0026 13.1997 5.88378 11.9933 6.11529 10.8295C6.3468 9.66557 6.91825 8.59647 7.75736 7.75736C8.59648 6.91824 9.66557 6.3468 10.8295 6.11529C11.9933 5.88378 13.1997 6.0026 14.2961 6.45672C15.3925 6.91085 16.3295 7.67988 16.9888 8.66658C17.6481 9.65327 18 10.8133 18 12C18.0004 12.788 17.8455 13.5684 17.5441 14.2966C17.2427 15.0247 16.8007 15.6863 16.2435 16.2435C15.6863 16.8007 15.0247 17.2427 14.2966 17.5441C13.5684 17.8455 12.788 18.0004 12 18V18ZM12 8C11.643 8.00499 11.2882 8.05811 10.9454 8.15792C11.228 8.54195 11.3636 9.01454 11.3277 9.48998C11.2917 9.96542 11.0865 10.4122 10.7494 10.7494C10.4122 11.0865 9.96542 11.2917 9.48998 11.3277C9.01454 11.3636 8.54195 11.228 8.15792 10.9454C7.93924 11.7511 7.97871 12.605 8.27079 13.3871C8.56286 14.1691 9.09283 14.8399 9.78609 15.305C10.4794 15.7701 11.301 16.006 12.1354 15.9797C12.9698 15.9533 13.7749 15.666 14.4375 15.158C15.1 14.6501 15.5866 13.9473 15.8287 13.1483C16.0708 12.3494 16.0563 11.4947 15.7872 10.7044C15.5181 9.91415 15.008 9.22818 14.3286 8.74305C13.6492 8.25791 12.8348 7.99804 12 8V8Z" />
    </Icon>
  );
};

export const NotVisibleIcon = (props: FillProps) => {
  const activeFill = useIconFill(props);
  return (
    <Icon
      boxSize={props.boxSize ? props.boxSize : "24px"}
      viewBox="0 0 24 24"
      fill={activeFill}
    >
      <path d="M12 17.4C9.15563 17.4 6.85313 15.1984 6.64125 12.4084L2.7075 9.36825C2.19038 10.017 1.7145 10.7029 1.3305 11.4529C1.24472 11.6226 1.20002 11.81 1.20002 12.0002C1.20002 12.1903 1.24472 12.3778 1.3305 12.5475C3.36413 16.5154 7.39013 19.2 12 19.2C13.0091 19.2 13.9826 19.05 14.9209 18.8078L12.975 17.3021C12.6536 17.3642 12.3273 17.397 12 17.4ZM23.7683 19.5788L19.6226 16.3748C20.8819 15.3135 21.9177 14.0124 22.6695 12.5471C22.7553 12.3774 22.8 12.19 22.8 11.9998C22.8 11.8097 22.7553 11.6222 22.6695 11.4525C20.6359 7.48462 16.6099 4.8 12 4.8C10.0693 4.80234 8.16998 5.28839 6.4755 6.21375L1.70475 2.52637C1.64254 2.47797 1.5714 2.44229 1.4954 2.42138C1.41939 2.40048 1.34001 2.39476 1.26179 2.40454C1.18358 2.41433 1.10805 2.43943 1.03954 2.47842C0.97103 2.5174 0.910871 2.56951 0.862504 2.63175L0.126379 3.57937C0.0287282 3.70499 -0.0150284 3.86426 0.00473267 4.02213C0.0244937 4.18001 0.106154 4.32357 0.231754 4.42125L22.2953 21.4736C22.3575 21.522 22.4286 21.5577 22.5046 21.5786C22.5806 21.5995 22.66 21.6052 22.7382 21.5955C22.8164 21.5857 22.892 21.5606 22.9605 21.5216C23.029 21.4826 23.0891 21.4305 23.1375 21.3683L23.874 20.4206C23.9716 20.295 24.0153 20.1357 23.9955 19.9778C23.9756 19.8199 23.8939 19.6764 23.7683 19.5788ZM16.8788 14.2538L15.405 13.1145C15.5291 12.7558 15.5949 12.3795 15.6 12C15.6073 11.4443 15.4842 10.8947 15.2406 10.3953C14.997 9.89583 14.6396 9.46048 14.1972 9.12421C13.7548 8.78793 13.2397 8.56009 12.6933 8.459C12.1468 8.35791 11.5843 8.38638 11.0509 8.54212C11.277 8.84854 11.3993 9.21918 11.4 9.6C11.3944 9.72672 11.375 9.85246 11.3423 9.975L8.58188 7.84163C9.54075 7.04033 10.7504 6.60092 12 6.6C12.7093 6.59961 13.4116 6.73901 14.067 7.01025C14.7223 7.28148 15.3177 7.67923 15.8193 8.18074C16.3208 8.68226 16.7185 9.27771 16.9898 9.93304C17.261 10.5884 17.4004 11.2908 17.4 12C17.4 12.8111 17.2016 13.5671 16.8788 14.2541V14.2538Z" />
    </Icon>
  );
};

export const FolderIcon = (props: FillProps) => {
  const activeFill = useIconFill(props);
  return (
    <Icon
      boxSize={props.boxSize ? props.boxSize : "24px"}
      viewBox="0 0 24 24"
      fill={activeFill}
    >
      <path d="M21.75 6H12.75L9.75 3H2.25C1.00734 3 0 4.00734 0 5.25V18.75C0 19.9927 1.00734 21 2.25 21H21.75C22.9927 21 24 19.9927 24 18.75V8.25C24 7.00734 22.9927 6 21.75 6Z" />
    </Icon>
  );
};

export const DashboardIcon = (props: FillProps) => {
  const activeFill = useIconFill(props);
  return (
    <Icon
      boxSize={props.boxSize ? props.boxSize : "24px"}
      viewBox="0 0 24 24"
      fill={activeFill}
    >
      <path d="M23.25 18H3V3.75C3 3.33562 2.66438 3 2.25 3H0.75C0.335625 3 0 3.33562 0 3.75V19.5C0 20.3283 0.671719 21 1.5 21H23.25C23.6644 21 24 20.6644 24 20.25V18.75C24 18.3356 23.6644 18 23.25 18ZM21.75 4.5H16.2159C15.2138 4.5 14.7117 5.71172 15.4205 6.42047L16.9392 7.93922L13.5 11.3789L10.0608 7.93969C9.47484 7.35375 8.52516 7.35375 7.93969 7.93969L4.71984 11.1595C4.42688 11.4525 4.42688 11.9273 4.71984 12.2203L5.78016 13.2806C6.07312 13.5736 6.54797 13.5736 6.84094 13.2806L9 11.1211L12.4392 14.5603C13.0252 15.1462 13.9748 15.1462 14.5603 14.5603L19.0603 10.0603L20.5791 11.5791C21.2878 12.2878 22.4995 11.7858 22.4995 10.7836V5.25C22.5 4.83562 22.1644 4.5 21.75 4.5Z" />
    </Icon>
  );
};

export const HomeIcon = (props: FillProps) => {
  const activeFill = useIconFill(props);
  return (
    <Icon
      boxSize={props.boxSize ? props.boxSize : "24px"}
      viewBox="0 0 24 24"
      fill={activeFill}
    >
      <path d="M11.6821 7.51083L3.99997 13.8379V20.6667C3.99997 20.8435 4.07021 21.013 4.19523 21.1381C4.32025 21.2631 4.48982 21.3333 4.66663 21.3333L9.3358 21.3212C9.51203 21.3204 9.68075 21.2497 9.80505 21.1248C9.92936 20.9999 9.99914 20.8308 9.99913 20.6546V16.6667C9.99913 16.4899 10.0694 16.3203 10.1944 16.1953C10.3194 16.0702 10.489 16 10.6658 16H13.3325C13.5093 16 13.6788 16.0702 13.8039 16.1953C13.9289 16.3203 13.9991 16.4899 13.9991 16.6667V20.6517C13.9989 20.7394 14.0159 20.8263 14.0493 20.9074C14.0827 20.9885 14.1317 21.0623 14.1937 21.1244C14.2556 21.1865 14.3292 21.2358 14.4102 21.2695C14.4912 21.3031 14.5781 21.3204 14.6658 21.3204L19.3333 21.3333C19.5101 21.3333 19.6797 21.2631 19.8047 21.1381C19.9297 21.013 20 20.8435 20 20.6667V13.8333L12.3196 7.51083C12.2293 7.43805 12.1168 7.39836 12.0008 7.39836C11.8848 7.39836 11.7723 7.43805 11.6821 7.51083V7.51083ZM23.8166 11.8112L20.3333 8.94V3.16875C20.3333 3.03614 20.2806 2.90896 20.1869 2.81519C20.0931 2.72143 19.9659 2.66875 19.8333 2.66875H17.5C17.3674 2.66875 17.2402 2.72143 17.1464 2.81519C17.0526 2.90896 17 3.03614 17 3.16875V6.19416L13.2696 3.125C12.9116 2.8304 12.4623 2.66934 11.9987 2.66934C11.5351 2.66934 11.0859 2.8304 10.7279 3.125L0.180802 11.8112C0.130171 11.8531 0.088283 11.9045 0.0575297 11.9625C0.0267763 12.0206 0.00776086 12.0841 0.00156977 12.1495C-0.00462132 12.2149 0.00213331 12.2809 0.0214477 12.3437C0.0407621 12.4064 0.0722577 12.4648 0.114135 12.5154L1.17663 13.8071C1.2184 13.8579 1.26977 13.8999 1.3278 13.9308C1.38583 13.9617 1.44939 13.9809 1.51484 13.9872C1.58029 13.9935 1.64633 13.9868 1.7092 13.9676C1.77207 13.9483 1.83052 13.9169 1.88122 13.875L11.6821 5.8025C11.7723 5.72972 11.8848 5.69003 12.0008 5.69003C12.1168 5.69003 12.2293 5.72972 12.3196 5.8025L22.1208 13.875C22.1714 13.9169 22.2298 13.9484 22.2926 13.9677C22.3553 13.987 22.4213 13.9938 22.4867 13.9876C22.5521 13.9814 22.6156 13.9624 22.6737 13.9316C22.7317 13.9008 22.7831 13.859 22.825 13.8083L23.8875 12.5167C23.9293 12.4658 23.9607 12.4071 23.9798 12.344C23.9988 12.281 24.0053 12.2148 23.9987 12.1492C23.9921 12.0837 23.9726 12.0201 23.9414 11.9621C23.9101 11.9041 23.8678 11.8528 23.8166 11.8112V11.8112Z" />
    </Icon>
  );
};

export const SearchIcon = (props: FillProps) => {
  const activeFill = useIconFill(props);
  return (
    <Icon
      boxSize={props.boxSize ? props.boxSize : "24px"}
      viewBox="0 0 24 24"
      fill={activeFill}
    >
      <path d="M23.6719 20.7516L18.9984 16.0781C18.7875 15.8672 18.5016 15.75 18.2016 15.75H17.4375C18.7312 14.0953 19.5 12.0141 19.5 9.75C19.5 4.36406 15.1359 0 9.75 0C4.36406 0 0 4.36406 0 9.75C0 15.1359 4.36406 19.5 9.75 19.5C12.0141 19.5 14.0953 18.7313 15.75 17.4375V18.2016C15.75 18.5016 15.8672 18.7875 16.0781 18.9984L20.7516 23.6719C21.1922 24.1125 21.9047 24.1125 22.3406 23.6719L23.6672 22.3453C24.1078 21.9047 24.1078 21.1922 23.6719 20.7516ZM9.75 15.75C6.43594 15.75 3.75 13.0688 3.75 9.75C3.75 6.43594 6.43125 3.75 9.75 3.75C13.0641 3.75 15.75 6.43125 15.75 9.75C15.75 13.0641 13.0687 15.75 9.75 15.75Z" />
    </Icon>
  );
};

export const PlusIcon = (props: FillProps) => {
  const activeFill = useIconFill(props);
  return (
    <Icon
      boxSize={props.boxSize ? props.boxSize : "24px"}
      viewBox="0 0 24 24"
      fill={activeFill}
    >
      <path d="M21 9.75H14.25V3C14.25 2.17172 13.5783 1.5 12.75 1.5H11.25C10.4217 1.5 9.75 2.17172 9.75 3V9.75H3C2.17172 9.75 1.5 10.4217 1.5 11.25V12.75C1.5 13.5783 2.17172 14.25 3 14.25H9.75V21C9.75 21.8283 10.4217 22.5 11.25 22.5H12.75C13.5783 22.5 14.25 21.8283 14.25 21V14.25H21C21.8283 14.25 22.5 13.5783 22.5 12.75V11.25C22.5 10.4217 21.8283 9.75 21 9.75Z" />
    </Icon>
  );
};

export const MoreVerticalIcon = (props: FillProps) => {
  const activeFill = useIconFill(props);
  return (
    <Icon
      boxSize={props.boxSize ? props.boxSize : "24px"}
      viewBox="0 0 24 24"
      fill={"none"}
    >
      <path
        d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
        stroke={activeFill}
        strokeWidth="2.505"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
        stroke={activeFill}
        strokeWidth="2.505"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
        stroke={activeFill}
        strokeWidth="2.505"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export const MoreHorizontalIcon = (props: FillProps) => {
  const activeFill = useIconFill(props);
  return (
    <Icon
      boxSize={props.boxSize ? props.boxSize : "24px"}
      viewBox="0 0 24 24"
      fill={"none"}
    >
      <path
        d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
        stroke={activeFill}
        strokeWidth="2.505"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
        stroke={activeFill}
        strokeWidth="2.505"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
        stroke={activeFill}
        strokeWidth="2.505"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export const ChevronDownIcon = (props: FillProps) => {
  const activeFill = useIconFill(props);
  return (
    <Icon
      boxSize={props.boxSize ? props.boxSize : "25px"}
      viewBox="0 0 25 25"
      fill={activeFill}
    >
      <path d="M11.9762 17.9216L2.86633 8.81173C2.42697 8.37237 2.42697 7.66006 2.86633 7.22074L3.92885 6.15823C4.36746 5.71962 5.07832 5.71878 5.51796 6.15635L12.7717 13.3761L20.0253 6.15635C20.465 5.71878 21.1758 5.71962 21.6145 6.15823L22.677 7.22074C23.1163 7.6601 23.1163 8.37242 22.677 8.81173L13.5672 17.9216C13.1278 18.3609 12.4155 18.3609 11.9762 17.9216Z" />
    </Icon>
  );
};

export const HamburgerIcon = (props: FillProps) => {
  const activeFill = useIconFill(props);
  return (
    <Icon
      boxSize={props.boxSize ? props.boxSize : "24px"}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M3 12H21"
        stroke={activeFill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 6H21"
        stroke={activeFill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 18H21"
        stroke={activeFill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export const ExclamationIcon = (props: FillProps) => {
  const activeFill = useIconFill(props);
  return (
    <Icon
      boxSize={props.boxSize ? props.boxSize : "24px"}
      viewBox="0 0 24 24"
      fill={activeFill}
    >
      <path d="M15.75 20.25C15.75 22.3177 14.0677 24 12 24C9.93225 24 8.25 22.3177 8.25 20.25C8.25 18.1823 9.93225 16.5 12 16.5C14.0677 16.5 15.75 18.1823 15.75 20.25ZM8.68406 1.1812L9.32156 13.9312C9.35152 14.5299 9.84567 15 10.4452 15H13.5548C14.1543 15 14.6485 14.5299 14.6784 13.9312L15.3159 1.1812C15.348 0.538594 14.8358 0 14.1923 0H9.80766C9.16425 0 8.65195 0.538594 8.68406 1.1812Z" />
    </Icon>
  );
};

export const CheckIcon = (props: FillProps) => {
  const activeFill = useIconFill(props);
  return (
    <Icon
      boxSize={props.boxSize ? props.boxSize : "24px"}
      viewBox="0 0 24 24"
      fill={activeFill}
    >
      <path d="M8.15147 20.5971L0.351472 12.7971C-0.117137 12.3285 -0.117137 11.5687 0.351472 11.1L2.04849 9.40294C2.5171 8.93428 3.27694 8.93428 3.74555 9.40294L9 14.6573L20.2545 3.40294C20.7231 2.93433 21.4829 2.93433 21.9515 3.40294L23.6485 5.1C24.1171 5.56861 24.1171 6.32841 23.6485 6.79706L9.84854 20.5971C9.37988 21.0657 8.62008 21.0657 8.15147 20.5971V20.5971Z" />
    </Icon>
  );
};

export const AlpacaLogoIcon = (props: FillProps) => {
  const fill = props.fill ? props.fill : "#FCD72B";
  return (
    <Icon
      boxSize={props.boxSize ? props.boxSize : "48px"}
      viewBox="0 0 48 48"
      fill={fill}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7005 47.2311L18.5806 27.1304H18.3594C16.8111 27.1304 15.5945 26.5812 14.3779 25.5927C13.2719 24.6041 12.4977 23.1762 12.1659 21.7483L15.7051 19.4416C15.7051 17.9039 16.3687 16.3661 17.3641 15.1579C18.47 14.0595 19.9078 13.2906 21.5668 13.2906H22.6728V9.33638C23.447 9.33638 24.1106 9.55606 24.7742 10.1053C25.3272 10.5446 25.7696 11.3135 25.8802 12.0824V9.33638C26.4332 9.33638 26.9862 9.44622 27.5392 9.77574C27.9816 10.1053 28.424 10.4348 28.7558 10.984C29.0876 11.5332 29.1982 12.0824 29.1982 12.6316C29.1982 13.1808 28.977 13.73 28.7558 14.2792C29.7512 14.9382 30.5253 15.8169 31.0783 16.8055C31.6313 17.7941 31.9631 19.0023 31.9631 20.1007V44.3753C31.9631 44.7048 32.0737 45.0343 32.4055 45.3638C32.6267 45.5835 32.9585 45.8032 33.4009 45.8032H34.9493C32.7373 46.9016 30.3041 47.7803 27.7604 48.1098C39.1521 46.2426 48 36.2471 48 24.1648C48 10.7643 37.2719 0 24 0C10.7281 0 0 10.7643 0 24.1648C0 34.9291 6.96774 44.0458 16.7005 47.2311ZM19.576 19.881C19.4654 19.9908 19.3548 20.2105 19.3548 20.4302L19.2442 21.1991H20.682C21.1244 21.1991 21.4562 21.0892 21.6774 20.7597C21.8986 20.4302 22.1198 20.1007 22.1198 19.6613H20.0184C19.7972 19.6613 19.6866 19.7712 19.576 19.881Z"
      />
    </Icon>
  );
};
