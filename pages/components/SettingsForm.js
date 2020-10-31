import { useState, useCallback } from "react";
import {
  Layout,
  AccountConnection,
  Link,
  Card,
  Checkbox,
} from "@shopify/polaris";

const SettingsForm = () => {
  const [connected, setConnected] = useState(false);
  const [autoPublish, setAutoPublish] = useState(false);

  const accountName = connected ? "Jane Appleseed" : "";

  const handleAction = useCallback(() => {
    setConnected((connected) => !connected);
  }, [connected]);

  const buttonText = connected ? "Disconnect" : "Connect";
  const details = connected ? "bigman.myshopify.com" : "No account connected";
  const terms = connected ? null : (
    <p>
      By clicking <strong>Connect</strong>, you agree to accept Dropshipp’s{" "}
      <Link url="#">terms and conditions</Link>. You’ll pay a commission rate of
      15% on sales made through Dropshipp.
    </p>
  );
  return (
    <Layout>
      <Layout.AnnotatedSection
        title="Connected User"
        description="Connect your Shopify store with your Dropshipp account"
      >
        <AccountConnection
          avatarUrl="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
          accountName={accountName}
          connected={connected}
          title="Dropshipp"
          action={{
            content: buttonText,
            onAction: handleAction,
          }}
          details={details}
          termsOfService={terms}
        />
      </Layout.AnnotatedSection>
      <Layout.AnnotatedSection
        title="Selling and Shipping"
        description="Manage products, pricing, shipping and customer notifications"
      >
        <Card sectioned title="Products">
          <Checkbox
            label="Automatically Publish new Products"
            helpText="New Products added in Dropshipp will immediately be publushed to all of your Shopify sales channels"
            checked={autoPublish}
            onChange={useCallback(() => {
              setAutoPublish((autoPublish) => !autoPublish);
            }, [autoPublish])}
          ></Checkbox>
        </Card>
        <Card sectioned title="Pricing Rules"></Card>
        <Card sectioned title="Shipping"></Card>
      </Layout.AnnotatedSection>
      <Layout.AnnotatedSection
        title="Reporting"
        description="Manage how you track success with Dropshipp"
      >
        <Card sectioned title="Products"></Card>
      </Layout.AnnotatedSection>
    </Layout>
  );
};

export default SettingsForm;
