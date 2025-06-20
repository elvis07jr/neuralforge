import React, { useState, useEffect } from 'react';

 Simple Button component (from original code for standalone example)
const Button = ({ children, size, variant, className, ...props }) = {
  let baseClasses = font-semibold py-2 px-4 rounded-full transition-all duration-300;
  if (size === lg) {
    baseClasses = font-semibold py-5 px-10 rounded-full transition-all duration-300;
  }

  let variantClasses = ;
  if (variant === ghost) {
    variantClasses = text-white hoverbg-white10 border border-white20;
  } else {
    variantClasses = bg-gradient-to-r from-cyan-500 to-purple-600 hoverfrom-cyan-600 hoverto-purple-700 text-white border-0 shadow-lg hovershadow-cyan-50025;
  }

  return (
    button className={`${baseClasses} ${variantClasses} ${className}`} {...props}
      {children}
    button
  );
};

 Simple inline SVG for Zap icon (from original code for standalone example)
const Zap = ({ className }) = (
  svg
    xmlns=httpwww.w3.org2000svg
    width=24
    height=24
    viewBox=0 0 24 24
    fill=none
    stroke=currentColor
    strokeWidth=2
    strokeLinecap=round
    strokeLinejoin=round
    className={className}
  
    polygon points=13 2 3 14 12 14 11 22 21 10 12 10 13 2polygon
  svg
);


export default function App() {
  const [showAIStudio, setShowAIStudio] = useState(false);
  const [promptInput, setPromptInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

   Function to call the Gemini API
  const generateAIIdeas = async () = {
    if (!promptInput.trim()) {
      setError('Please enter a concept or problem to generate ideas.');
      return;
    }
    setLoading(true);
    setAiResponse('');
    setError('');

    const chatHistory = [];
    const userPrompt = `Based on the following concept or problem '${promptInput}', suggest 3 innovative AI project ideas. For each idea, briefly describe its purpose, outline 2-3 potential technical challenges, and list 3 key AItech stacks that would be suitable for its implementation. Format the response clearly with bold headings for each idea and bullet points for challenges and tech stacks.`;
    chatHistory.push({ role user, parts [{ text userPrompt }] });

    const payload = { contents chatHistory };
    const apiKey = ;  Canvas will automatically provide the API key
    const apiUrl = `httpsgenerativelanguage.googleapis.comv1betamodelsgemini-2.0-flashgenerateContentkey=${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method 'POST',
        headers { 'Content-Type' 'applicationjson' },
        body JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status ${response.status}`);
      }

      const result = await response.json();

      if (result.candidates && result.candidates.length  0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length  0) {
        const text = result.candidates[0].content.parts[0].text;
        setAiResponse(text);
      } else {
        setAiResponse('No ideas generated. Please try a different prompt.');
      }
    } catch (e) {
      console.error('Error calling Gemini API', e);
      setError(`Failed to generate ideas ${e.message}. Please try again.`);
      setAiResponse('');
    } finally {
      setLoading(false);
    }
  };

   Effect to load JetBrains Mono font
  useEffect(() = {
    const link = document.createElement('link');
    link.href = 'httpsfonts.googleapis.comcss2family=JetBrains+Monowght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

     Clean up function to remove the link when the component unmounts
    return () = {
      document.head.removeChild(link);
    };
  }, []);  Empty dependency array means this runs once on mount

  return (
     Applied font-['JetBrains_Mono'] to the main container
    div className=relative min-h-screen flex flex-col items-center justify-center overflow-hidden font-['JetBrains_Mono'] pb-20
      { Background with abstract tech pattern }
      div
        className=absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900
      
        div className=absolute inset-0 bg-black30div
        { Animated background elements }
        div className=absolute top-14 left-14 w-64 h-64 bg-cyan-50010 rounded-full blur-3xl animate-pulsediv
        div className=absolute bottom-13 right-14 w-48 h-48 bg-purple-50010 rounded-full blur-2xl animate-pulse delay-1000div
        div className=absolute top-12 right-13 w-32 h-32 bg-blue-50010 rounded-full blur-xl animate-pulse delay-500div
      div

      { Main content card }
      div className=relative z-10 max-w-5xl mx-auto px-8 w-full mt-10 mb-10
        div className=bg-white5 backdrop-blur-xl rounded-2xl border border-white10 p-8 smp-16 text-center shadow-2xl
          { Logo and brand }
          div className=flex flex-col smflex-row items-center justify-center gap-4 mb-10
            div className=p-3 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl
              Zap className=w-12 h-12 text-white 
            div
            h1 className=text-4xl mdtext-6xl font-bold bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent
              NeuralForge
            h1
          div

          { Studio badge }
          div className=flex justify-center mb-10
            span className=text-cyan-200 text-base smtext-lg bg-gradient-to-r from-cyan-50020 to-purple-50020 px-6 py-2 smpx-8 smpy-3 rounded-full backdrop-blur-sm border border-cyan-30020
              Intelligent Automation Studio
            span
          div

          { Tagline }
          h2 className=text-xl mdtext-3xl font-light text-white90 mb-10 border-b border-white10 pb-10
            Where Intelligence Meets Innovation. Where Code Becomes Consciousness.
          h2

          { Description }
          p className=text-base mdtext-2xl text-white70 mb-16 leading-relaxed max-w-4xl mx-auto
            We engineer next-generation AI solutions — from autonomous decision systems to intelligent workflow orchestration, designed for tomorrow's challenges.
          p

          { Action buttons }
          div className=flex flex-col smflex-row gap-6 justify-center items-center mb-16
            Button
              size=lg
              className=bg-gradient-to-r from-cyan-500 to-purple-600 hoverfrom-cyan-600 hoverto-purple-700 text-white border-0 px-10 py-5 text-xl rounded-full transition-all duration-300 shadow-lg hovershadow-cyan-50025
            
              Start Building
            Button
            Button
              variant=ghost
              size=lg
              className=text-white hoverbg-white10 border border-white20 px-10 py-5 text-xl rounded-full transition-all duration-300
            
              Explore Demos
            Button
            { New Button for AI Studio }
            Button
              size=lg
              className=bg-gradient-to-r from-green-500 to-teal-600 hoverfrom-green-600 hoverto-teal-700 text-white border-0 px-10 py-5 text-xl rounded-full transition-all duration-300 shadow-lg hovershadow-green-50025
              onClick={() = setShowAIStudio(!showAIStudio)}
            
              ✨ AI Idea Forge
            Button
          div

          { Tech icons }
          div className=flex flex-wrap justify-center gap-6 smgap-12 pt-10 border-t border-white10
            div className=w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-40020 to-blue-50020 flex items-center justify-center border border-cyan-30030
              div className=w-5 h-5 bg-cyan-400 rounded-fulldiv
            div
            div className=w-10 h-10 rounded-lg bg-gradient-to-br from-purple-40020 to-pink-50020 flex items-center justify-center border border-purple-30030
              div className=w-6 h-6 border-2 border-purple-400 rounded-sm transform rotate-12div
            div
            div className=w-10 h-10 rounded-lg bg-gradient-to-br from-green-40020 to-emerald-50020 flex items-center justify-center border border-green-30030
              div className=w-3 h-6 bg-green-400 rounded-fulldiv
            div
            div className=w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-40020 to-orange-50020 flex items-center justify-center border border-yellow-30030
              div className=w-5 h-5 border-2 border-yellow-400 transform rotate-45div
            div
            Zap className=w-10 h-10 text-cyan-40080 
          div
        div

        { AI Idea Forge Section }
        {showAIStudio && (
          div className=mt-10 p-8 smp-12 bg-white5 backdrop-blur-xl rounded-2xl border border-white10 shadow-2xl text-white
            h3 className=text-3xl font-bold text-center mb-6 bg-gradient-to-r from-green-300 to-teal-400 bg-clip-text text-transparent
              AI Idea Forge ✨
            h3
            p className=text-white70 text-center mb-6
              Enter a concept or problem, and let Gemini generate innovative AI project ideas for you!
            p
            textarea
              className=w-full h-32 p-4 mb-6 rounded-lg bg-white10 border border-white20 text-white placeholder-white50 focusoutline-none focusring-2 focusring-green-500
              placeholder=e.g., 'Smart city traffic management' or 'Personalized learning for students'
              value={promptInput}
              onChange={(e) = setPromptInput(e.target.value)}
            textarea
            div className=flex justify-center mb-6
              Button
                className=bg-gradient-to-r from-green-500 to-teal-600 hoverfrom-green-600 hoverto-teal-700 text-white px-8 py-4 text-lg rounded-full shadow-lg
                onClick={generateAIIdeas}
                disabled={loading}
              
                {loading  'Forging Ideas...'  'Generate Ideas'}
              Button
            div
            {error && (
              p className=text-red-400 text-center mb-4{error}p
            )}
            {aiResponse && (
              div className=mt-8 p-6 bg-white10 rounded-lg border border-white20
                h4 className=text-2xl font-semibold mb-4 text-green-300Generated Ideash4
                div
                  className=text-white90 leading-relaxed prose prose-invert max-w-none
                  dangerouslySetInnerHTML={{ __html aiResponse.replace((.)g, 'strong$1strong').replace(ng, 'br') }}
                
              div
            )}
          div
        )}

        { Footer }
        div className=flex flex-col smflex-row justify-between items-center mt-12 text-white50 text-xs smtext-base text-center smtext-left gap-2
          span© 2025 NeuralForge Technologies. Forging the Future.span
          a href=# className=hovertext-cyan-300 transition-colors underline decoration-cyan-30050
            Terms & Privacy
          a
        div
      div
    div
  );
}
