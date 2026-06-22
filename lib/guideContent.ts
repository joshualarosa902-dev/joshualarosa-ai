// Readable web content for resource pages — enables the "metered paywall" teaser.
// `teaser` shows free; `rest` is revealed after the email gate. (Per-slug; more added
// during the legacy landing-page rebrand.)
export type GuideContent = { teaser: string; rest: string };

export const GUIDE_CONTENT: Record<string, GuideContent> = {
  "smart-shot-openart": {
    teaser: `
      <p class="lede">OpenArt just put the two best AI models on the planet into one tool called Smart Shot — and it's the first one that actually <em>directs</em>.</p>
      <h3>Two models. One that finally directs.</h3>
      <p><strong>GPT Image 2</strong> is the brain — it understands your scene and designs it. <strong>Seedance 2.0</strong> is the execution — it renders the video. Together they do something no other tool does: they plan the entire scene <em>before</em> rendering a single frame.</p>
      <h3>Why your AI clips never matched</h3>
      <p>Every other tool hands you a random clip and hopes you like it. Different character every generation. Random camera angles. Nothing cuts together. You can't build a scene out of slot-machine pulls — which is why most AI video still looks like disconnected clips instead of a story.</p>
    `,
    rest: `
      <h3>What it builds before it renders</h3>
      <p>Type one sentence. Before a single frame renders, Smart Shot writes a full production document:</p>
      <ul>
        <li><strong>Character sheets</strong> — so the same person shows up in every shot.</li>
        <li><strong>A top-down floor plan</strong> — with the camera path already drawn.</li>
        <li><strong>A six-shot storyboard</strong> — fully labeled, shot by shot.</li>
        <li><strong>Lens choices</strong> — 24mm for the wide, 50mm for the orbit, 18mm for the crane.</li>
        <li><strong>Lighting specs</strong> — on every single shot.</li>
      </ul>
      <p>This is what a director and a cinematographer spend weeks building before they shoot anything. Smart Shot did it in about 30 seconds.</p>
      <h3>Direct it. Don't prompt it.</h3>
      <p>Give it intent like a director: who's in the shot, where you are, the feeling you want. Then review the plan and adjust — swap a lens, change the light. You're approving a plan, not gambling on a clip.</p>
      <h3>My 10 best cinematic prompts</h3>
      <p>Paste any of these in as your one sentence. Each names a character, a camera move, a lens, and the light.</p>
      <ol>
        <li><strong>The founder reveal —</strong> "A young founder sits alone in a dark studio at 2am, lit only by monitor glow; open on an 18mm crane drop and settle into a 50mm close-up as she finally smiles."</li>
        <li><strong>Product hero —</strong> "A matte-black device rotates on a concrete plinth in a fog-lit warehouse; orbit on a 35mm, then cut to an 85mm macro on the logo as one hard spotlight hits."</li>
        <li><strong>Walk-and-talk b-roll —</strong> "A creator walks through a sunlit loft talking to camera; track alongside on a 24mm gimbal, then cut to a 50mm over-the-shoulder as he sits."</li>
        <li><strong>Before / after —</strong> "The same man slumped at a messy desk in cold blue light, then standing confident in warm golden light; hold both on a locked-off 35mm."</li>
        <li><strong>City energy —</strong> "A solo entrepreneur crosses a neon-wet street at night; start on a 24mm low-angle, whip to a 50mm follow as the crowd blurs."</li>
        <li><strong>Calm authority —</strong> "An investor leans back in a leather chair in a wood-panelled office; slow 50mm push-in, soft window light, dust in the air."</li>
        <li><strong>The build montage —</strong> "Hands type on a laptop in a quiet cabin at dawn; 35mm tabletop, rack focus from screen to coffee steam, warm low sun."</li>
        <li><strong>Dramatic statement —</strong> "A speaker in a black void under one hard key light; 85mm chest-up, slow orbit so the shadow sweeps across his face."</li>
        <li><strong>Lifestyle aspiration —</strong> "A woman sips coffee on a balcony over the ocean at sunrise; 18mm wide of the view, dolly in to a 50mm of her face in first light."</li>
        <li><strong>The identity close —</strong> "A creator looks straight down the lens and says one line; 50mm dead-center, shallow depth, a single practical light blooming behind."</li>
      </ol>
    `,
  },
};
