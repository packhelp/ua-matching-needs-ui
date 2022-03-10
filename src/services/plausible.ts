type RegisteredEvents = "Hit Claim Button" | "Hit Call Button"

export class Plausible {
  private static registerEvent(name: RegisteredEvents) {
    // @ts-expect-error
    if (typeof window.plausible === "function") {
      // @ts-expect-error
      window.plausible(name)
    }
  }

  public static registerIntentionPhoneCall() {
    this.registerEvent("Hit Call Button")
  }
  public static registerIntentionClaim() {
    this.registerEvent("Hit Claim Button")
  }
}
