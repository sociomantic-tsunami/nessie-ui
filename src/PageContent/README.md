## Component Description

PageContent wraps the body content of the page. It should be placed inside the
Page component, between a PageHeader component and a PageFooter component. It
provides a overlay with a Spinner to be displayed while the page content loads.

## Example Usage

```
<Page>
    <PageHeader>…</PageHeader>
    <PageContent>
        <Card>…</Card>
        <Card>…</Card>
    </PageContent>
    <PageFooter>…</PageFooter>
</Page>
```
