import { useState, useCallback } from "react";
import {
  Layout,
  AccountConnection,
  Link,
  Card,
  Checkbox,
  Stack,
  TextField,
  Select,
  FormLayout,
  Heading,
  VisuallyHidden,
  ChoiceList,
  PageActions,
  Form,
} from "@shopify/polaris";

const SettingsForm = () => {
  const [connected, setConnected] = useState(false);
  const [autoPublish, setAutoPublish] = useState(false);
  const [pricingRule, setPricingRule] = useState("Fixed Markup");
  const [pricingModifier, setPricingModifier] = useState(1);
  const [trackingUrl, setTrackingUrl] = useState("");
  const [emailFulfillment, setEmailFulfillment] = useState(true);
  const [reportingEmailFrequency, setReportingEmailFrequency] = useState([
    "Weekly",
  ]);

  const accountName = connected ? "Jane Appleseed" : "";
  const buttonText = connected ? "Disconnect" : "Connect";
  const details = connected ? "bigman.myshopify.com" : "No account connected";

  const Terms = connected ? null : (
    <p>
      By clicking <strong>Connect</strong>, you agree to accept Dropshipp’s{" "}
      <Link url="#">terms and conditions</Link>. You’ll pay a commission rate of
      15% on sales made through Dropshipp.
    </p>
  );
  const PricingRuleInput = (
    <Select
      label="Pricing rule method"
      labelHidden
      options={["Multiplier", "Fixed Markup"]}
      value={pricingRule}
      onChange={useCallback((pricing) => setPricingRule(pricing), [])}
    ></Select>
  );
  const HelpText = (
    <span>
      Overrides the normal shipment tracking link emailed to your Customer.{" "}
      <Link url="#">Learn More about custom tracking</Link>
    </span>
  );

  const handleAction = useCallback(() => {
    setConnected((connected) => !connected);
  }, [connected]);

  const handleSubmit = useCallback(() => {
    (event) => {
      event.preventDefault();
      console.log("SettingsForm -> connected", connected);
      console.log("SettingsForm -> autoPublish", autoPublish);
      console.log("SettingsForm -> pricingRule", pricingRule);
      console.log("SettingsForm -> pricingModifier", pricingModifier);
      console.log("SettingsForm -> trackingUrl", trackingUrl);
      console.log("SettingsForm -> emailFulfillment", emailFulfillment);
      console.log(
        "SettingsForm -> reportingEmailFrequency",
        reportingEmailFrequency
      );
    };
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
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
            termsOfService={Terms}
          />
        </Layout.AnnotatedSection>
        {/*  */}
        <Layout.AnnotatedSection
          title="Selling and Shipping"
          description="Manage products, pricing, shipping and customer notifications"
        >
          <Card sectioned title="Products">
            <Checkbox
              label="Automatically Publish new Products"
              helpText="New Products added in Dropshipp will immediately be publushed to all of your Shopify sales channels"
              checked={autoPublish}
              onChange={useCallback(
                () => setAutoPublish((autoPublish) => !autoPublish),
                [autoPublish]
              )}
            ></Checkbox>
          </Card>

          <Card sectioned title="Pricing Rules">
            <Stack alignment="baseline">
              <span>Product list price = Your cost</span>{" "}
              <span>{pricingRule === "Multiplier" ? "x" : "+"}</span>{" "}
              <div style={{ maxWidth: 200 }}>
                <TextField
                  connectedLeft={PricingRuleInput}
                  value={pricingModifier}
                  onChange={useCallback((price) => {
                    setPricingModifier(price);
                  }, [])}
                ></TextField>
              </div>
            </Stack>
          </Card>

          <Card sectioned title="Shipping">
            <FormLayout>
              <Checkbox
                label="Email customers when Orders are fulfilled"
                checked={emailFulfillment}
                onChange={useCallback(() => {
                  setEmailFulfillment((email) => !email);
                }, [])}
              ></Checkbox>

              <TextField
                value={trackingUrl}
                onChange={useCallback((url) => {
                  setTrackingUrl(url);
                }, [])}
                label="Custom Shipment tracking URL"
                helpText={HelpText}
              ></TextField>
            </FormLayout>
          </Card>
        </Layout.AnnotatedSection>
        {/*  */}
        <Layout.AnnotatedSection
          title="Reporting"
          description="Manage how you track success with Dropshipp"
        >
          <Card sectioned title="Products">
            <VisuallyHidden>
              <Heading>Reporting Details</Heading>
            </VisuallyHidden>
            <ChoiceList
              title="Receive Reports via email"
              choices={[
                { label: "Never", value: "Never" },
                { label: "Daily", value: "Daily" },
                { label: "Weekly", value: "Weekl" },
                { label: "Monthly", value: "Never" },
              ]}
              selected={reportingEmailFrequency}
              onChange={useCallback((frequency) => {
                setReportingEmailFrequency(frequency);
              }, [])}
            ></ChoiceList>
          </Card>
        </Layout.AnnotatedSection>
        <Layout.Section>
          <PageActions primaryAction={{ content: "Save" }}></PageActions>
        </Layout.Section>
      </Layout>
    </Form>
  );
};

export default SettingsForm;
