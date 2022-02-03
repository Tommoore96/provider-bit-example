import React from 'react';
import { MessageCard } from './message-card';

export const Icon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    data-testid="svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.20706 1.70718L3.79285 0.292969L0.292847 3.79297L1.70706 5.20718L5.20706 1.70718ZM18.2071 0.292969L21.7071 3.79297L20.2928 5.20718L16.7928 1.70718L18.2071 0.292969ZM11 21.0001C5.47711 21.0001 0.999953 16.5229 0.999953 11.0001C0.999953 5.47723 5.47711 1.00008 11 1.00008C16.5228 1.00008 21 5.47723 21 11.0001C21 16.5229 16.5228 21.0001 11 21.0001ZM11 19.0001C15.4182 19.0001 19 15.4184 19 11.0001C19 6.5818 15.4182 3.00008 11 3.00008C6.58168 3.00008 2.99995 6.5818 2.99995 11.0001C2.99995 15.4184 6.58168 19.0001 11 19.0001ZM16 10.0001H12V5.00008H9.99995V12.0001H16V10.0001Z"
      fill="#495CE9"
    />
  </svg>
);

export const BasicMessageCard = () => (
  <MessageCard title="Message Title">
    Descriptor text adding extra information and context
  </MessageCard>
);

export const BasicMessageCardWithSvg = () => (
  <MessageCard icon={<Icon />} title="Message Title">
    Descriptor text adding extra information and context
  </MessageCard>
);
