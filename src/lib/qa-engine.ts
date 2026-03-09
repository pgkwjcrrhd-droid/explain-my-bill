import billsData from '@/data/bills.json'
import { formatCurrency, formatDate } from './utils'

interface QAResponse {
  question: string
  answer: string
  followUps: string[]
  sources?: string[]
}

const currentBill = billsData.bills[billsData.bills.length - 1]
const previousBill = billsData.bills[billsData.bills.length - 2]

export const qaEngine = {
  answers: [
    {
      pattern: /why|charges|increased|went up|higher|cost/i,
      question: "Why did my bill increase?",
      answer: `Your bill has gradually increased over the past few months due to several factors:

**Plan Rate Increase:** Your My Xfinity Plan increased from $18.95 (Dec 2024) to $22.95 (May 2025) - a $4 increase.

**Service Upgrades:** Your internet speed was upgraded from 1200 Mbps to 1300 Mbps, which contributed to the service charge increase from $59 to $63.

**Equipment Charges:** TV box rental increased from $8 to $9.60 per unit (May 2025), then to $11.20 per unit (January 2026), reflecting higher equipment costs.

**Good News:** Despite these increases, your service discount ($40.05) and total savings ($67.45) remain consistent, helping offset increases. Your current bill stabilized at $102.58.

Would you like to discuss ways to optimize your services?`,
      followUps: [
        "What discounts am I eligible for?",
        "Can I downgrade my internet speed?",
        "Why does equipment cost keep increasing?"
      ],
      sources: ["Bill overview", "Service history"]
    },
    {
      pattern: /discount|save|savings/i,
      question: "What discounts am I getting on my bill?",
      answer: `Great question! You're receiving excellent discounts:

**Service Discount:** $40.05 per month - This is applied to your services and is consistent across all your bills.

**Promotional Discounts on Add-ons:**
- Xfinity TV Latino: $10 monthly discount (effectively $0)
- Gigabit Extra: $2 monthly discount

**Total Monthly Savings:** $67.45 - This represents the cumulative savings from your service discount and promotional offers. This is reducing your total bill significantly.

These discounts are locked in with your account, and we're committed to maintaining them. Your total bill would be approximately $170 without these savings!

Would you like to maximize your savings further?`,
      followUps: [
        "Are there other discounts available?",
        "When do my discounts expire?",
        "How much am I saving annually?"
      ],
      sources: ["Discount details", "Service summary"]
    },
    {
      pattern: /equipment|modem|box|tv|remote/i,
      question: "Why are my equipment charges so high?",
      answer: `Your equipment charges include:

**TV Equipment Rental:** You have 3 TV boxes with remotes totaling $33.60 ($11.20 each as of your latest bill). This covers rental and maintenance.

**Modem:** $12.00/month for your Xfinity modem, which enables your high-speed internet.

**Total Equipment:** $45.60/month

The reason charges increased from $36 (December 2024) to $45.60 (January 2026) is due to:
1. Equipment cost adjustments to reflect current market rates
2. Maintenance and support services included with rental

You have the option to purchase your own modem to eliminate that $12/month charge permanently. This would pay for itself in about 4 months and is compatible with our network.

Would you like information about purchasing your own modem?`,
      followUps: [
        "Can I buy my own modem?",
        "How many TV boxes do I need?",
        "What modems are compatible?"
      ],
      sources: ["Equipment fees", "Service details"]
    },
    {
      pattern: /internet|speed|mbps|gigabit/i,
      question: "What internet speed am I paying for?",
      answer: `Your internet service has been upgraded over time:

**December 2024:** Internet 1200 Mbps - $59/month (included in services)
**May 2025:** Internet 1300 Mbps - $63/month (upgraded)
**February 2026 (Current):** Internet Gigabit Extra - $63/month

Your current Gigabit Extra plan includes:
- Gigabit-class speeds (up to 1.2 Gbps)
- Included Gigabit Extra technology
- Premium network prioritization
- 24/7 support

This is premium internet service perfect for your business needs. At 1.2 Gbps, you can support multiple high-bandwidth applications simultaneously without slowdown.

Need faster speeds or want to optimize your plan?`,
      followUps: [
        "What speeds do I actually get?",
        "Is Gigabit Extra worth it?",
        "Can I downgrade to a slower speed?"
      ],
      sources: ["Service tier", "Internet details"]
    },
    {
      pattern: /video|recording|storage/i,
      question: "What is the 24/7 Video Recording charge?",
      answer: `Your 24/7 Video Recording service is $4.00/month and provides continuous video surveillance storage.

This feature is part of your Home Security/Home Pro Protection service, which is a key part of your $55 monthly home protection plan. The recording service allows you to:

- Access 24-hour rolling video storage
- Monitor multiple cameras (integrated with your DVR system)
- Review footage on demand
- Archive important events

Combined with your Premium DVR ($16) and Home Security service ($55), you have a comprehensive home monitoring solution. Total investment in these services: $75/month.

Your total savings of $67.45 helps offset these premium security features.

Want to learn more about your security options?`,
      followUps: [
        "How much storage do I have?",
        "Can I access the video remotely?",
        "Do I need all these security features?"
      ],
      sources: ["Home security", "Recording service"]
    },
    {
      pattern: /streaming|netflix|apple|provider/i,
      question: "Why do I see streaming services on my bill?",
      answer: `You previously had Netflix on your bill:

**December 2024 - May 2025:** Netflix $12.40 - $14.40/month

**January 2026 - Present:** Netflix was removed and replaced with Apple MLS Season Pass ($0.00)

This bundling feature allows you to add streaming services directly to your Comcast bill for convenience. However, these charges appear on your Comcast invoice even though they're third-party services.

**Your Current Situation:** You no longer have Netflix charges (likely canceled in December 2025), and your Apple MLS pass is at no cost, bringing your "Other Providers" charge to $0.

This actually saved you approximately $14.40/month!

Would you like to add or modify any streaming services?`,
      followUps: [
        "Can I add Netflix back?",
        "What streaming services are available?",
        "Why was Netflix removed from my bill?"
      ],
      sources: ["Third-party services", "Service changes"]
    },
    {
      pattern: /taxes|fee|franchise|911|regulatory|usf/i,
      question: "Why do I have so many taxes and fees?",
      answer: `Your taxes and fees total $10.03/month and include several regulatory charges:

**Federal USF (Universal Service Fund):** $0.30 - Federal requirement supporting telecommunications access nationwide

**Regulatory Fee:** $1.05 - State regulatory compliance fee

**Franchise Fee:** $2.71 - Local government franchise tax (typically 5% of certain charges)

**Sales Tax:** $4.02 - Standard PA sales tax on your service charges

**911 Service Fee:** $1.95 - Supports emergency 911 system infrastructure in your area

**Total: $10.03/month ($120.36/year)**

These fees are mandated by federal, state, and local governments and apply to most telecom services in Pennsylvania. They're unavoidable but transparent—we must list them separately on your bill.

Have questions about specific fees?`,
      followUps: [
        "Are these fees avoidable?",
        "Why is the franchise fee so high?",
        "What is 911 tax used for?"
      ],
      sources: ["Tax breakdown", "Regulatory details"]
    },
    {
      pattern: /total|bill amount|current bill|due|february/i,
      question: "What is my current bill amount?",
      answer: `Your **February 2026 (Current) Bill: $102.58**

**Service Period:** February 12, 2026 - March 11, 2026
**Billing Date:** February 7, 2026
**Due Date:** March 1, 2026
**AutoPay Date:** March 1, 2026

This bill is consistent with your January bill, showing stability in your monthly costs after the plan adjustments made in 2025.

**What's Included:**
- My Xfinity Plan: $22.95
- Services (TV, Internet, Voice, Security): $63.00
- Add-ons & Equipment: $73.60
- Service Discount: -$40.05
- Taxes & Fees: $10.03

You're on AutoPay, so your account will be automatically charged on March 1, 2026.

Need a payment plan or have questions about your bill?`,
      followUps: [
        "When is my bill due?",
        "Can I change my payment date?",
        "Do I have AutoPay set up?"
      ],
      sources: ["Current bill", "Account status"]
    },
    {
      pattern: /previous|past|older|bill history|december|may|january/i,
      question: "How have my bills changed over time?",
      answer: `Here's your bill history over 14 months:

**December 2024:** $104.90
- Plan: $18.95
- Internet: 1200 Mbps
- Equipment: $36.00

**May 2025:** $112.38 (+7.1%)
- Plan: $22.95 (+$4.00)
- Internet: 1300 Mbps (upgraded)
- Equipment: $40.80 (+$4.80)
- Netflix: $14.40 (added)

**January 2026:** $102.58 (-8.7%)
- Plan: $22.95 (stable)
- Internet: 1300 Mbps (stable)
- Equipment: $45.60 (+$4.80)
- Netflix: Removed (-$14.40)

**February 2026 (Current):** $102.58 (stable)
- All services stable
- Internet: Gigabit Extra (premium tier)

**Key Insight:** Despite price increases for individual services, your overall bill dropped when you removed Netflix. Your locked-in discount of $40.05 continues to protect you.

Want a detailed breakdown of any month?`,
      followUps: [
        "What changed in May 2025?",
        "Why did my bill decrease in January?",
        "Can we negotiate my rates?"
      ],
      sources: ["Bill history", "Service timeline"]
    },
    {
      pattern: /save|annual|yearly|over time|reduce|lower/i,
      question: "How much am I saving with my current plan?",
      answer: `You're saving **$67.45 per month, or $809.40 annually** with your current service discount and promotional offers.

**Monthly Breakdown:**
- Service Discount: $40.05
- Promo Discounts: $10.00 (TV Latino, Gigabit Extra)
- **Total: $67.45**

**Without These Discounts, Your Bill Would Be:**
$102.58 + $67.45 = **$170.03/month**

That's **66.5% higher than what you're paying now.**

**Over 12 Months:**
- Current Annual Cost: $1,230.96
- Cost without Discounts: $2,040.36
- **Annual Savings: $809.40**

These discounts are locked to your account and represent exceptional value. We're committed to maintaining them.

Ready to protect these savings long-term?`,
      followUps: [
        "What if I lose my discount?",
        "How long is my discount locked in?",
        "Can you lock in a better rate?"
      ],
      sources: ["Discount analysis", "Savings summary"]
    },
    {
      pattern: /premium|dvr|latino|add-on|service/i,
      question: "What add-ons do I have?",
      answer: `You're subscribed to premium add-on services totaling $24.00/month:

**Premium DVR: $16.00/month**
- Store up to 500 hours of recordings
- Record up to 6 shows simultaneously
- Cloud storage for your library
- Restart any show on your channel lineup

**Xfinity TV Latino: $0.00/month** (with $10 promotional discount)
- 100+ channels in Spanish
- Premium content and telenovelas
- Sports and news in Spanish
- On-demand Latin programming

**Gigabit Extra: $8.00/month** (with $2 promotional discount)
- Enhanced internet prioritization
- Optimized network performance
- Priority customer support
- Complements your Gigabit internet tier

**Combined Value:** These premium services enhance both your entertainment and internet experience.

Need to adjust any of these services?`,
      followUps: [
        "Do I need Premium DVR?",
        "Can I add other channels?",
        "What is Gigabit Extra exactly?"
      ],
      sources: ["Premium services", "Add-on details"]
    },
    {
      pattern: /home|security|protection|monitoring/i,
      question: "What home services am I paying for?",
      answer: `You're subscribed to comprehensive home services as part of your bundle:

**Home Pro Protection / Home Security: $55.00/month**
This premium service includes:
- Professional monitoring (24/7/365)
- Home automation capabilities
- Emergency response coordination
- Integrated with your home network
- Camera and sensor support

**24/7 Video Recording: $4.00/month**
- Continuous video storage
- Multi-camera support
- On-demand access to footage
- Archive capabilities

**Premium DVR: $16.00/month** (pairs with home system)
- Manages security camera feeds
- Integrates recording services
- Cloud backup of critical footage

**Total Home Investment:** $75.00/month

Your Home Security service is robust and professionally monitored, giving you peace of mind knowing your home is protected even when you're away.

Want to review your security setup?`,
      followUps: [
        "Is professional monitoring necessary?",
        "Can I lower my security costs?",
        "What equipment is installed?"
      ],
      sources: ["Home protection", "Security overview"]
    },
    {
      pattern: /voice|phone|calling|call|line/i,
      question: "What's included in my voice service?",
      answer: `Your Voice service is $4.00/month and includes:

**Features:**
- Unlimited local and long-distance calling
- Call waiting, caller ID, and voicemail
- Call forwarding and 3-way calling
- Integrated with your Xfinity package

**Your Current Setup:**
You have voice service bundled with your TV, Internet, and Home Security for maximum convenience. One bill, one provider, one support line.

**Value:**
At just $4.00/month, voice service is included as part of your comprehensive bundle rather than charged as a standalone service. This reflects the bundle pricing advantage.

Many customers use this as their primary business line, combining with the reliability of your Gigabit internet.

Need to adjust your voice service features?`,
      followUps: [
        "Can I use this for business?",
        "Do I have unlimited calling?",
        "Can I add phone lines?"
      ],
      sources: ["Voice service", "Features list"]
    },
    {
      pattern: /contact|support|help|issue|problem|broken/i,
      question: "How do I contact support?",
      answer: `For support with your Comcast Business account:

**Your Account Phone Number:** (484) 879-4476

**Account Details:**
- Account Number: 8499 10 088 0241988
- Customer: Nicholas Fernandez
- Address: 503 WOODVIEW DR, EXTON, PA 19341-1738

**Support Options:**
1. **Business Support:** 1-877-769-5066 (24/7)
2. **Technical Support:** Included in your Home Pro Protection subscription
3. **Billing Questions:** Available through your online portal
4. **AutoPay Status:** Automatic charges on the 1st of each month

**Quick Tips:**
- Have your account number ready
- Service is available 24/7
- Chat support available through Xfinity portal
- Mobile app available for account management

Your service is set to AutoPay, so no action needed on your part unless you want to modify your account.

Anything specific you need help with?`,
      followUps: [
        "Can you call me about my bill?",
        "How do I update my information?",
        "Can I change my payment method?"
      ],
      sources: ["Account details", "Contact information"]
    },
    {
      pattern: /payment|autopay|due date|scheduled|charge/i,
      question: "How is my bill paid?",
      answer: `Your account has AutoPay enabled, which is excellent for account management:

**AutoPay Schedule:**
- Monthly charge date: 1st of each month
- Amount: Your current bill ($102.58)
- Status: Active and automatic

**Recent Payments:**
- February 2026: $102.58 (Paid Feb 2)
- January 2026: $102.58 (Paid Jan 2)
- May 2025: $112.38 (Paid May 2)
- December 2024: $104.90 (Paid Dec 2)

**Benefits of AutoPay:**
- Never miss a payment
- Avoid late fees
- Automatic service continuation
- One less thing to manage

**Payment Method:**
Your AutoPay is set up and processing automatically. You can view/update payment methods through your Xfinity online account.

**Next Payment:**
March 1, 2026 - $102.58

Need to adjust payment settings?`,
      followUps: [
        "Can I change my payment date?",
        "How do I turn off AutoPay?",
        "What payment methods do you accept?"
      ],
      sources: ["Payment history", "AutoPay status"]
    },
    {
      pattern: /tv|channel|ultimate|content|streaming/i,
      question: "What TV service am I paying for?",
      answer: `Your TV service is premium tier with excellent coverage:

**TV Ultimate: Included in $63.00 services charge**

**What's Included:**
- 300+ channels (varies by market)
- Premium content and sports
- On-demand library
- Integration with your 3 TV boxes
- Access to streaming apps

**Your Equipment Setup:**
- 3 TV Boxes with Remotes: $33.60/month
- Premium DVR with 500-hour storage: $16.00/month
- TV Latino package: $0.00/month (with discount)

**Total TV Service Investment:** $49.60/month (after discounts)

**Premium Features You Have:**
- Premium DVR for recording
- Multi-room capability (3 TVs)
- Latino programming option
- On-demand content included
- Cloud storage integration

This is a comprehensive TV package designed for families or businesses with multiple viewing areas.

Want to optimize your TV service?`,
      followUps: [
        "Do I need 3 TV boxes?",
        "Can I reduce my TV package?",
        "What channels are included?"
      ],
      sources: ["TV service details", "Package information"]
    }
  ] as const,

  findAnswer(userQuestion: string): QAResponse {
    const trimmedQuestion = userQuestion.trim().toLowerCase()
    
    for (const qa of this.answers) {
      if (qa.pattern.test(trimmedQuestion)) {
        return {
          question: qa.question,
          answer: qa.answer,
          followUps: [...qa.followUps],
          sources: [...qa.sources]
        }
      }
    }

    return {
      question: userQuestion,
      answer: `Thank you for your question. Based on your current bill for February 2026 totaling $102.58, here's what I can tell you:

Your bill includes premium Comcast Business services with TV Ultimate, Gigabit-class internet, home security, and professional monitoring. You're receiving excellent value with $67.45 in monthly savings through your service discount and promotional offers.

For specific questions about your account details, charges, or service options, I'm here to help. You can also contact Comcast Business Support at 1-877-769-5066 for personalized assistance.

Is there a specific service or charge you'd like me to explain?`,
      followUps: [
        "Can you explain my total bill?",
        "What discounts am I getting?",
        "How has my bill changed?"
      ],
      sources: ["Bill summary", "Account overview"]
    }
  }
}