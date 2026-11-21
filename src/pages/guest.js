import React from "react";
import styled from "@emotion/styled";

import Layout from "components/layout";
import { theme } from "../constants";

const NETWORK = "Tell My Wi-Fi I'm Just Visiting";
const PASSWORD = "HeRi-GPZy-Xt5A";

export const Head = () => (
  <>
    <meta charSet="utf-8" />
    <meta name="robots" content="noindex, nofollow" />
    <title>Guest Wi-Fi</title>
  </>
);

const Container = styled("section")`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 480px;
  margin: 2rem auto;
  padding: 0 1rem;
  text-align: center;
`;

const Label = styled("p")`
  margin: 0;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.7;
`;

const Value = styled("p")`
  margin: 0.25rem 0 1.25rem;
  font-size: 1.25rem;
  font-weight: bold;
  color: ${theme.secondaryColor};
  user-select: all;
  overflow-wrap: anywhere;
`;

const Password = styled(Value)`
  font-family: monospace;
  font-size: 1.5rem;
`;

const QRCode = styled("img")`
  width: 100%;
  max-width: 320px;
  height: auto;
  margin-top: 0.5rem;
`;

function Guest() {
  return (
    <Layout page="guest">
      <Container>
        <Label>SSID</Label>
        <Value>{NETWORK}</Value>
        <Label>Password</Label>
        <Password>{PASSWORD}</Password>
        <QRCode
          src="/wifi-guest-qrcode.jpg"
          alt={`QR code to join the ${NETWORK} Wi-Fi network`}
        />
      </Container>
    </Layout>
  );
}

export default Guest;
