declare namespace google.accounts.id {
  interface CredentialResponse {
    clientId?: string;
    credential: string;
    select_by?: string;
  }

  interface IdConfiguration {
    client_id: string;
    callback: (response: CredentialResponse) => void;
  }

  function initialize(config: IdConfiguration): void;
  function renderButton(
    parent: HTMLElement,
    options: { theme: string; size: string }
  ): void;
}

interface Window {
  google: {
    accounts: {
      id: typeof google.accounts.id;
    };
  };
}
