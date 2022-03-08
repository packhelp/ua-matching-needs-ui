import { Translation } from "./definitions"

export const EN: Translation = {
  "/tickets/add": "Post your request",
  "/tickets/active": "Requests",
  "/tickets/active/mine": "My requests",
  "/tickets/inactive/mine": "My inactive requests",
  "/sign-in": "Sign in",
  "/contact": "Contact",
  "/faq": "FAQ",

  generic: {
    yes: "Yes",
    no: "No",
    close: "Close",
  },

  pages: {
    active: {
      title: "Current requests",
    },
    "sign-in": {
      title: "Sign in",
      label: "Enter your mobile phone number",
      placeholder: "600100200",
      next: "Next",
      "phone-verification": {
        title: "Enter verification code",
        label:
          "We've sent a verification code to the number provided. Enter the code below to sign in.",
        placeholder: "123 456",
        next: "Next",
      },
    },
    main: {
      header: "Humanitarian aid management in an easy & efficient way",
      subheader: "Helping others? Connect with people who need help.",
      description:
        "Post what you need and we will pass your request to organizations and individuals who can make it happen.",
      "show-all-button": "View current requests",
      "add-new-button": "Post your request",
      "steps-section": {
        header: "How does it work?",
        "step-1-title": "Post your request",
        "step-1-description":
          "Describe what you need - a place to stay for someone, two mattresses or transporation from the border - then add your phone number and the location where you need it.",
        "step-2-title": "We publish the request and look for a solution",
        "step-2-description":
          "Your request is shared with organizations and individuals who can help you organize it. ",
        "step-3-title": "We deactivate handled requests",
        "step-3-description":
          "After 24 hours, we automatically hide the request. If the aid is organised earlier, authors can remove requests before the 24 hours pass.",
      },
      "for-whom-section": {
        header: "Who is this platform for?",
        "list-item-1":
          "For coordinators and entities working in humanitarian aid for Ukraine.",
        "list-item-2": "For reception points at the border.",
        "list-item-3": "And for every single one of us who wants to help!",
      },
    },
    ticket: {
      metaTitle: {
        need: "Need",
        cta: "Help Ukraine via potrzeby-ua.org",
      },
      description: {
        "read-more": "Read more",
      },
      shareButton: {
        deliverTo: "Deliver to:",
        copySuccess: "Copied to the clipboard!",
      },
      verifiedOrganisation: "Verified organisation",
      whoRequested: "Posted by",
      whoRequestedNeed: "Posted by",
      whereToDeliver: "Where is it needed?",
      added: "Added on",
      share: "Share",
      whatsNeeded: "What's needed?",
      howMuchIsNeeded: "Quantity?",
      needActiveTill: "Request active until",
      views: "Views",
      needNumber: "Request",
      details: "Details",
      ticketRemovedAddNew: "Request deleted. You can add another one.",
      ticketSolvedAddNew:
        "Your request has been marked as handled! You can add another one.",
      ticketNotFound:
        "Your request has not been found or it's no longer active.",
      here: "here",
      errorOnRemove: "(Some) error occurred while deleting request.",
      errorOnResolved:
        "(Some) error occurred while marking the request as handled.",
      warningTicketExpired: "Caution: Request is no longer active!",
      ticketExpiresAfterSetTime:
        "Requests expire after the time determined by the person posting it",
      requesterCanExpireTicketAtAnyTime:
        "The person posting a request can at any time make the request inactive.",
      lookForAnotherTicketThanksForHelp:
        "Search for another request - we appreciate your help!",
      helpType: "Type of need",
      call: "Call",
      areYouTheAuthorOfThisTicket: "Are you the author of this request?",
      problemSolved: "Mark the request as handled!",
      remove: "Delete",
      needExpired: "The request expired",
    },
    "add-ticket": {
      "add-need": "Post a request",
      adults: "Adults",
      adultsHint: "Number of people",
      adultsAge: "> 12 years",
      children: "Children",
      childrenHint: "Number of children",
      childrenAge: "< 12 years",
      chooseLocation: "Choose location",
      "has-pets": "Animals",
      "children-hint": "Number of people younger than 12",
      title: "Title (short)",
      "title-hint": "Housing in Poznan for 2 adults",
      "what-do-you-need": "What is it that you need?",
      "what-do-you-need-hint":
        "For example: A 2-person mattress for mother and child. Context and urgency: We were to take refugees (mother and child) to our home, but now we are finally hosting a grandmother, 3 mothers and 2 children. We don't have enough beds for them. Extra information: We don't have access to a car. We kindly ask anyone to bring it to us.",
      "how-much-do-you-need": "How much do you need?",
      "in-pieces-if-applicable": "No. of items needed (if applicable)",
      "where-do-you-need-it-delivered": "Where is it needed?",
      "address-or-gps":
        'Address or a link to Google Maps (for example: "Malczewskiego 5, Warsaw", "https://goo.gl/maps/7PstSRCaTDXsQkoW6")',
      "who-needs-it": "Who needs it?",
      "name-surname-or-org-name": "Your full name or name of the organisation",
      "request-added": "Request received!",
      "need-added": "Requed posted!",
      show_phone_public: "Show my phone number publicly",
      whereFrom: "From where?",
      whereTo: "To where?",
      "hide-phone-disclaimer":
        "Remember that the person offering help must have a way of contacting you. If you do not want to share the phone, please provide a different form of contact in the description.",
    },
    "extended": {
      "title": "Ticket updated",
      "description":"Your ticket is extended for next 24h",
      "showTicket":"Show your ticket"
    }
  },
  "sign-out": "Sign out",
  "terms-of-service": {
    title: "Terms of Service",
    "title-alternate": "Terms and Conditions",
    agreemenent:
      "Posting a request means that you accept the Terms and Conditions of the platform.",
  },
  contact: {
    "contact-us-via": "Get in touch with us via:",
    slack: "Slack",
    discord: "Discord",
    github: "Github",
    authors: "Authors of the platform:",
    "in-cooperation-with":
      "The platform has been creared in collaboration with:",
  },
  partners: {
    "with-us": "Co-created with:",
  },
  errors: {
    "error-occured-while-adding":
      "Error occurred while posting the request dodawania: ",
  },
  auth: {
    "you-have-been-logged-out": "You have signed out",
  },
  faq: {
    header: "FAQ",
    sectionOne: {
      title: "What is",
      description:
        "The platform was established to improve the organization of humanitarian aid for the victims of the war in Ukraine. You can easily add a request for any kind of help - if you are looking for an apartment for people from Ukraine, you need transport from the border, or food or medicine. Then you add the location - ie.: the pickup point at the border, or the destination where you are looking for accommodation - and a contact number for yourself. After adding the information, we look for organizations or people who can help with your report.",
    },
    sectionTwo: {
      title: "Why do you need my mobile number?",
      description:
        "We care about efficient operation and quick resolution of inquiries. Therefore, we only need a contact number for the purposes stated in the description of your need. We also it to confirm you are a real person, in order to ensure our platform can't be used in malicious ways. Your number will not be held or used for any other purpose.",
    },
    sectionThree: {
      title: "Can I share active requests?",
      description:
        "Yes, you can share all reequests on Twitter, Telegram and Facebook as well as by sending a direct link.",
    },
    sectionFour: {
      title: "Can I contact people looking for help directly?",
      description:
        "Yes, the numbers provided are intended so that people who can provide the necessary help can contact you quickly and deal with their request.",
    },
    sectionFive: {
      title: "Are requests removed automatically?",
      description:
        "Yes, after 24 hours each ad is automatically deleted. If your application has already been resolved earlier - e.g. you have managed to find the transport within a few hours of posting the request - you can delete it yourself.",
    },
    sectionSix: {
      title: "Where can I find the terms and conditions of the platform?",
      description: "You'll find the Terms and Conditions",
      here: "here",
    },
    sectionSeven: {
      title: "Is there a fee to use the platform?",
      description:
        "No, the platform is completely free. Our goal is to help coordinate humanitarian aid efficiently.",
    },
    sectionEight: {
      title: "What are the categories for?",
      description:
        "Categories allow for a more precise definition of the type of assistance needed, as well as a more efficient search for potential requests for people need help.",
    },
  },
  filters: {
    selectNeeds: "Choose the type of your need",
    all: "All",
    whereFrom: "From where?",
    whereTo: "To where?",
  },
  menu: {
    open: "Open main menu",
  },
  metaData: {
    title: "Let's help Ukraine!",
    description:
      "Humanitarian aid management in an easy & efficient way. Helping others? Connect with people who need help.",
  },
  report: {
    title: "Does this request contain errors?",
    reportErrors: "Report issues",
    reportStale: "Out of date? Let us know.",
    actionReport: "Report",
    actionSend: "Submit",
    reason: {
      chooseReason: "Choose reason",
      options: {
        stale: "Request is stale",
        lacksContact: "Request is missing contact information",
        lacksDescription: "Request is missing description",
        itsAnOffer: "It’s not a request, it’s an offer",
        itsAnAdvertisementOrSpam: "It’s an ad or spam",
        wrongCategory: "Request has an incorrect category assigned",
        other: "Other reason",
      },
    },
    reasonDetails: "More information",
    thankYou: "Thank you!",
    thankYouForReport:
      "Thank you! Your application will allow us to improve the provision of assistance. Our moderators will take a look at your report in a moment.",
  },
}
