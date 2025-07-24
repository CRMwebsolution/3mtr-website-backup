export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'cost-of-owning-vs-renting',
    title: 'Cost of Owning vs. Renting',
    excerpt: 'Discover why renting a trailer can be more cost-effective than ownership for occasional needs.',
    content: `
      When it comes to trailers, the decision between owning and renting isn't always straightforward. Let's break down the costs and benefits of each option.

      ### The True Cost of Ownership

      1. Initial Purchase Price
      - New trailers can cost anywhere from $5,000 to $15,000+
      - Additional equipment and accessories needed
      - Registration and licensing fees

      2. Ongoing Expenses
      - Regular maintenance and repairs
      - Storage costs when not in use
      - Insurance coverage
      - Depreciation

      ### Benefits of Renting

      1. Cost Efficiency
      - Pay only when you need it
      - No maintenance or storage costs
      - Insurance included
      - Professional-grade equipment

      2. Flexibility
      - Access to different trailer types
      - No long-term commitment
      - 24/7 support and assistance

      ### When Renting Makes Sense

      - Occasional use (less than monthly)
      - Short-term projects
      - Trying different trailer types
      - Avoiding maintenance responsibilities

      ### Making the Right Choice

      Consider your frequency of use, storage availability, and maintenance capabilities when deciding between renting and owning. For most occasional users, renting provides the best value and convenience.
    `,
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    category: 'Tips & Advice',
    date: '2024-03-15'
  },
  {
    id: 'how-to-choose-right-trailer',
    title: 'How to Choose the Right Trailer',
    excerpt: 'Learn how to select the perfect trailer based on your specific needs and vehicle capabilities.',
    content: `
      Choosing the right trailer is crucial for a safe and successful hauling experience. Here's your comprehensive guide to making the best choice.

      ### Consider Your Vehicle First

      1. Towing Capacity
      - Check your vehicle's maximum towing capacity
      - Account for payload weight
      - Consider tongue weight limits

      2. Required Features
      - Ball hitch size compatibility
      - Brake controller requirements
      - Electrical connection type

      ### Types of Loads

      1. Equipment and Machinery
      - Weight distribution
      - Loading/unloading requirements
      - Securing points needed

      2. General Cargo
      - Weather protection needs
      - Volume requirements
      - Access points preferred

      ### Safety Considerations

      - Proper weight distribution
      - Brake system requirements
      - Lighting and visibility
      - Security features

      ### Making Your Decision

      Consider renting different trailer types to test what works best for your specific needs before making a long-term commitment.
    `,
    image: 'https://images.unsplash.com/photo-1592805144716-febd95d6c7f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    category: 'Guide',
    date: '2024-03-10'
  },
  {
    id: 'moving-made-easy',
    title: 'Moving Made Easy',
    excerpt: 'Essential tips for using trailers during your move, including packing and loading strategies.',
    content: `
      Make your next move smoother and more efficient with these professional tips for trailer usage.

      ### Planning Your Move

      1. Preparation
      - Create a detailed inventory
      - Plan loading sequence
      - Gather necessary supplies

      2. Loading Strategy
      - Heaviest items first
      - Proper weight distribution
      - Securing techniques

      ### Efficient Packing

      1. Box Organization
      - Size consistency
      - Clear labeling
      - Weight limits per box

      2. Space Utilization
      - Vertical stacking
      - Fill empty spaces
      - Protect fragile items

      ### Safety Tips

      - Proper tie-down techniques
      - Weather protection
      - Regular load checks
      - Safe driving practices

      ### Time-Saving Tips

      - Pre-pack non-essentials
      - Create a loading zone
      - Use proper equipment
      - Have help ready
    `,
    image: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    category: 'Moving Tips',
    date: '2024-03-05'
  }
];