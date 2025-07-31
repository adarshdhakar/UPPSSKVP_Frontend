import React, { useState, useCallback, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, Line, CatmullRomLine, Cone } from '@react-three/drei';
import * as THREE from 'three';

// =====================================================================================
// == 2D GRAPH COMPONENT for DFA Visualization (SVG)
// =====================================================================================
const DfaGraph2D = ({ dfa }) => {
    const width = 500;
    const height = 400;
    const nodeRadius = 25;

    const nodes = useMemo(() => {
        const radius = dfa.states.length > 1 ? Math.min(width, height) / 2 - nodeRadius * 2 : 0;
        return dfa.states.sort((a, b) => a.id - b.id).map((state, i) => {
            const angle = (i / dfa.states.length) * 2 * Math.PI;
            return {
                ...state,
                x: width / 2 + radius * Math.cos(angle),
                y: height / 2 + radius * Math.sin(angle),
            };
        });
    }, [dfa.states, width, height]);

    const nodeMap = useMemo(() => new Map(nodes.map(n => [n.id, n])), [nodes]);
    const startNode = nodes.find(n => n.isStart);

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
            <defs>
                <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="10"
                    refY="3.5"
                    orient="auto"
                >
                    <polygon points="0 0, 10 3.5, 0 7" fill="white" />
                </marker>
                 <marker
                    id="start-arrow"
                    markerWidth="10"
                    markerHeight="7"
                    refX="10"
                    refY="3.5"
                    orient="auto"
                >
                    <polygon points="0 0, 10 3.5, 0 7" fill="white" />
                </marker>
            </defs>

            {/* Render Initial State Arrow */}
            {startNode && (
                 <line
                    x1={startNode.x - nodeRadius - 40}
                    y1={startNode.y}
                    x2={startNode.x - nodeRadius - 2}
                    y2={startNode.y}
                    stroke="white"
                    strokeWidth="2"
                    markerEnd="url(#start-arrow)"
                />
            )}

            {/* Render Edges */}
            {nodes.map(node =>
                [...node.transitions.entries()].map(([char, targetState]) => {
                    const targetNode = nodeMap.get(targetState.id);
                    if (!targetNode) return null;

                    if (node.id === targetState.id) {
                        // Self-loop
                        return (
                            <g key={`${node.id}-${char}`}>
                                <path
                                    d={`M ${node.x}, ${node.y - nodeRadius} A ${nodeRadius*0.8} ${nodeRadius*0.8} 0 1 1 ${node.x + nodeRadius}, ${node.y}`}
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    markerEnd="url(#arrowhead)"
                                />
                                <text x={node.x} y={node.y - nodeRadius * 1.5} fill="#FBBF24" fontSize="12" textAnchor="middle">{char}</text>
                            </g>
                        );
                    }

                    // Standard edge
                    const angle = Math.atan2(targetNode.y - node.y, targetNode.x - node.x);
                    const startX = node.x + nodeRadius * Math.cos(angle);
                    const startY = node.y + nodeRadius * Math.sin(angle);
                    const endX = targetNode.x - nodeRadius * Math.cos(angle);
                    const endY = targetNode.y - nodeRadius * Math.sin(angle);

                    return (
                        <g key={`${node.id}-${char}-${targetState.id}`}>
                            <line
                                x1={startX}
                                y1={startY}
                                x2={endX}
                                y2={endY}
                                stroke="white"
                                strokeWidth="1.5"
                                markerEnd="url(#arrowhead)"
                            />
                            <text
                                x={(startX + endX) / 2}
                                y={(startY + endY) / 2 - 5}
                                fill="#FBBF24"
                                fontSize="12"
                                textAnchor="middle"
                            >
                                {char}
                            </text>
                        </g>
                    );
                })
            )}

            {/* Render Nodes */}
            {nodes.map(node => (
                <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                    <circle
                        r={nodeRadius}
                        fill={node.isStart ? '#34D399' : (node.isFinal ? '#F87171' : '#60A5FA')}
                        stroke="white"
                        strokeWidth={node.isFinal ? 2 : 0}
                    />
                    <text fill="white" textAnchor="middle" dy=".3em" fontWeight="bold">
                        q{node.id}
                    </text>
                </g>
            ))}
        </svg>
    );
};


// =====================================================================================
// == 3D GRAPH COMPONENT for DFA Visualization (Enhanced)
// =====================================================================================

const Arrow = ({ from, to }) => {
  const ref = useRef();
  const vec = new THREE.Vector3().subVectors(to, from);
  const length = vec.length();
  const direction = vec.normalize();
  const midPoint = new THREE.Vector3().addVectors(from, direction.clone().multiplyScalar(length));
  
  useFrame(() => {
    if (ref.current) {
      ref.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
    }
  });

  return (
    <group>
      <Line points={[from, to]} color="white" lineWidth={1} />
      <Cone ref={ref} args={[0.2, 0.5, 8]} position={midPoint}>
        <meshStandardMaterial color="#ffffff" />
      </Cone>
    </group>
  );
};

const DfaGraph3D = ({ dfa }) => {
  // Calculate node positions in a circle to avoid overlap
  const nodes = useMemo(() => {
    const radius = dfa.states.length > 1 ? dfa.states.length * 1.2 : 0;
    return dfa.states.sort((a,b) => a.id - b.id).map((state, i) => {
      const angle = (i / dfa.states.length) * 2 * Math.PI;
      return {
        ...state,
        position: [radius * Math.cos(angle), 0, radius * Math.sin(angle)],
      };
    });
  }, [dfa.states]);

  const nodeMap = useMemo(() => new Map(nodes.map(n => [n.id, n])), [nodes]);

  return (
    <Canvas camera={{ position: [0, 5, Math.max(15, dfa.states.length * 2)], fov: 60 }}>
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <OrbitControls />

      {/* Render Nodes */}
      {nodes.map((node) => (
        <group key={node.id} position={node.position}>
          <Sphere args={[0.8, 32, 32]}>
            <meshStandardMaterial 
              color={node.isStart ? '#34D399' : (node.isFinal ? '#F87171' : '#60A5FA')}
              emissive={node.isFinal ? '#F87171' : '#000000'}
              emissiveIntensity={node.isFinal ? 0.5 : 0}
            />
          </Sphere>
          <Text
            position={[0, 1.5, 0]}
            fontSize={0.8}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            q{node.id}
          </Text>
        </group>
      ))}

      {/* Render Edges (Transitions) */}
      {nodes.map(node =>
        [...node.transitions.entries()].map(([char, targetState]) => {
          const sourcePos = node.position;
          const targetNode = nodeMap.get(targetState.id);
          if (!targetNode) return null;
          const targetPos = targetNode.position;

          const isSelfLoop = node.id === targetState.id;

          if (isSelfLoop) {
            // Self-loop represented by a small circle above the node
            return (
              <group key={`${node.id}-${char}-${targetState.id}`} position={sourcePos}>
                 <Line points={[[0, 1, 0], [0.5, 1.5, 0], [1, 1, 0], [0.5, 0.5, 0], [0, 1, 0]]} color="white" lineWidth={1}/>
                 <Text position={[1.5, 1.5, 0]} fontSize={0.5} color="#FBBF24">{char}</Text>
              </group>
            );
          }

          // Calculate midpoint for the label
          const midPoint = [
            (sourcePos[0] + targetPos[0]) / 2,
            (sourcePos[1] + targetPos[1]) / 2 + 0.5, // Lift label slightly
            (sourcePos[2] + targetPos[2]) / 2,
          ];

          return (
            <group key={`${node.id}-${char}-${targetState.id}`}>
              <Line points={[sourcePos, targetPos]} color="white" lineWidth={1} />
              <Text position={midPoint} fontSize={0.5} color="#FBBF24">
                {char}
              </Text>
            </group>
          );
        })
      )}
    </Canvas>
  );
};


// =====================================================================================
// == LOGIC: Regular Expression to DFA Conversion (Translated from C++)
// =====================================================================================

let nodeIdCounter = 0;

class StateNode {
  constructor(isStart = false, isFinal = false) {
    this.id = nodeIdCounter++;
    this.isStart = isStart;
    this.isFinal = isFinal;
    this.connections = new Map();
    this.nfaStates = new Set();
    this.transitions = new Map();
  }
}

class NfaMachine {
  constructor() {
    this.nodes = new Set();
    this.startNode = null;
    this.endNode = null;
  }
  addNode(node) {
    this.nodes.add(node);
    if (node.isStart) this.startNode = node;
    if (node.isFinal) this.endNode = node;
  }
}

const unionMachines = (m1, m2) => {
  const newMachine = new NfaMachine();
  const startNode = new StateNode(true, false);
  const endNode = new StateNode(false, true);
  m1.startNode.isStart = false;
  m2.startNode.isStart = false;
  m1.endNode.isFinal = false;
  m2.endNode.isFinal = false;
  startNode.connections.set(m1.startNode, 'ε');
  startNode.connections.set(m2.startNode, 'ε');
  m1.endNode.connections.set(endNode, 'ε');
  m2.endNode.connections.set(endNode, 'ε');
  newMachine.addNode(startNode);
  m1.nodes.forEach(n => newMachine.addNode(n));
  m2.nodes.forEach(n => newMachine.addNode(n));
  newMachine.addNode(endNode);
  return newMachine;
};

const concatenateMachines = (m1, m2) => {
    m1.endNode.isFinal = false;
    for (const [node, char] of m2.startNode.connections.entries()) {
        m1.endNode.connections.set(node, char);
    }
    m2.nodes.forEach(node => {
        if (node !== m2.startNode) {
            m1.addNode(node);
        }
    });
    m1.endNode = m2.endNode;
    return m1;
};

const kleeneClosure = (m) => {
  const newMachine = new NfaMachine();
  const startNode = new StateNode(true, false);
  const endNode = new StateNode(false, true);
  m.startNode.isStart = false;
  m.endNode.isFinal = false;
  startNode.connections.set(endNode, 'ε');
  startNode.connections.set(m.startNode, 'ε');
  m.endNode.connections.set(endNode, 'ε');
  m.endNode.connections.set(m.startNode, 'ε');
  newMachine.addNode(startNode);
  m.nodes.forEach(n => newMachine.addNode(n));
  newMachine.addNode(endNode);
  return newMachine;
};

const precedence = (op) => {
  if (op === '*') return 3;
  if (op === '.') return 2;
  if (op === '+') return 1;
  return 0;
};

const infixToPostfix = (s, alphabet) => {
  const stack = [];
  let postfix = '';
  for (const ch of s) {
    if (alphabet.has(ch)) {
      postfix += ch;
    } else if (ch === '(') {
      stack.push(ch);
    } else if (ch === ')') {
      while (stack.length > 0 && stack[stack.length - 1] !== '(') {
        postfix += stack.pop();
      }
      stack.pop();
    } else {
      while (stack.length > 0 && precedence(stack[stack.length - 1]) >= precedence(ch)) {
        postfix += stack.pop();
      }
      stack.push(ch);
    }
  }
  while (stack.length > 0) {
    postfix += stack.pop();
  }
  return postfix;
};

const addImplicitConcat = (s, alphabet) => {
  let result = '';
  for (let i = 0; i < s.length; i++) {
    result += s[i];
    if (i + 1 < s.length) {
      const current = s[i];
      const next = s[i + 1];
      if ((alphabet.has(current) || current === ')' || current === '*') && (alphabet.has(next) || next === '(')) {
        result += '.';
      }
    }
  }
  return result;
};

const epsilonClosure = (states) => {
  const closure = new Set(states);
  const stack = [...states];
  while (stack.length > 0) {
    const u = stack.pop();
    for (const [v, char] of u.connections.entries()) {
      if (char === 'ε' && !closure.has(v)) {
        closure.add(v);
        stack.push(v);
      }
    }
  }
  return closure;
};

const convertNfaToDfa = (nfa, alphabet) => {
  if (!nfa || !nfa.startNode) return null;
  nodeIdCounter = 0;
  const dfaStates = new Map();
  const queue = [];
  const startClosure = epsilonClosure(new Set([nfa.startNode]));
  const startKey = [...startClosure].map(n => n.id).sort((a,b)=> a-b).join(',');
  const dfaStartNode = new StateNode(true, false);
  dfaStartNode.nfaStates = startClosure;
  dfaStates.set(startKey, dfaStartNode);
  queue.push(startClosure);

  while (queue.length > 0) {
    const currentNfaStates = queue.shift();
    const currentKey = [...currentNfaStates].map(n => n.id).sort((a,b)=> a-b).join(',');
    const currentDfaNode = dfaStates.get(currentKey);
    for (const nfaNode of currentNfaStates) {
      if (nfaNode.isFinal) {
        currentDfaNode.isFinal = true;
        break;
      }
    }
    for (const char of alphabet) {
      let moveStates = new Set();
      for (const nfaNode of currentNfaStates) {
        for (const [targetNode, transitionChar] of nfaNode.connections.entries()) {
          if (transitionChar === char) {
            moveStates.add(targetNode);
          }
        }
      }
      if (moveStates.size > 0) {
        const nextClosure = epsilonClosure(moveStates);
        const nextKey = [...nextClosure].map(n => n.id).sort((a,b)=> a-b).join(',');
        if (!dfaStates.has(nextKey)) {
          const newDfaNode = new StateNode(false, false);
          newDfaNode.nfaStates = nextClosure;
          dfaStates.set(nextKey, newDfaNode);
          queue.push(nextClosure);
        }
        currentDfaNode.transitions.set(char, dfaStates.get(nextKey));
      }
    }
  }
  const finalDfaStates = Array.from(dfaStates.values());
  const finalStates = finalDfaStates.filter(s => s.isFinal);
  return {
      states: finalDfaStates,
      startState: dfaStartNode,
      finalStates: finalStates,
  };
};

const buildNfaFromPostfix = (postfix, alphabet) => {
    const stack = [];
    nodeIdCounter = 0;
    for(const char of postfix) {
        if(alphabet.has(char)) {
            const startNode = new StateNode(true, false);
            const endNode = new StateNode(false, true);
            startNode.connections.set(endNode, char);
            const machine = new NfaMachine();
            machine.addNode(startNode);
            machine.addNode(endNode);
            stack.push(machine);
        } else if (char === '*') {
            const m1 = stack.pop();
            stack.push(kleeneClosure(m1));
        } else if (char === '+') {
            const m2 = stack.pop();
            const m1 = stack.pop();
            stack.push(unionMachines(m1, m2));
        } else if (char === '.') {
            const m2 = stack.pop();
            const m1 = stack.pop();
            stack.push(concatenateMachines(m1, m2));
        }
    }
    return stack.pop();
};


// =====================================================================================
// == REACT COMPONENT
// =====================================================================================

const RegexToDfaConverter = () => {
  const [alphabetStr, setAlphabetStr] = useState('a,b');
  const [regexStr, setRegexStr] = useState('a.b');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleGenerate = useCallback(() => {
    setError('');
    setResult(null);

    if (!alphabetStr.trim()) {
        setError("Alphabet cannot be empty.");
        return;
    }
    const alphabet = new Set(alphabetStr.split(',').map(s => s.trim()).filter(Boolean));
    if (alphabet.size === 0) {
        setError("Please define a valid alphabet (e.g., 'a,b').");
        return;
    }
    
    if (!regexStr.trim()) {
        setError("Regular expression cannot be empty.");
        return;
    }
    const processedRegex = addImplicitConcat(regexStr.replace(/\s/g, ''), alphabet);

    let balance = 0;
    for(const char of processedRegex) {
        if (char === '(') balance++;
        else if (char === ')') balance--;
        if (balance < 0) {
            setError("Invalid regular expression: Mismatched parentheses.");
            return;
        }
    }
    if (balance !== 0) {
        setError("Invalid regular expression: Mismatched parentheses.");
        return;
    }

    try {
        const postfix = infixToPostfix(processedRegex, alphabet);
        const nfa = buildNfaFromPostfix(postfix, alphabet);
        const dfa = convertNfaToDfa(nfa, alphabet);
        setResult({ alphabet, processedRegex, postfix, nfa, dfa });
    } catch (e) {
        setError(`An error occurred during conversion: ${e.message}. Please check your expression.`);
        console.error(e);
    }
  }, [alphabetStr, regexStr]);
  
  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-cyan-400">Regular Expression to DFA Converter</h1>
          <p className="text-gray-400 mt-2">Enter an alphabet and a regular expression to see the generated DFA.</p>
        </header>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <div>
              <label htmlFor="alphabet" className="block text-sm font-medium text-gray-300 mb-2">Alphabet (comma-separated)</label>
              <input 
                id="alphabet"
                type="text"
                value={alphabetStr}
                onChange={(e) => setAlphabetStr(e.target.value)}
                placeholder="e.g., a,b"
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="regex" className="block text-sm font-medium text-gray-300 mb-2">Regular Expression</label>
              <input 
                id="regex"
                type="text"
                value={regexStr}
                onChange={(e) => setRegexStr(e.target.value)}
                placeholder="e.g., (a+b)*a"
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="mt-6 text-center">
            <button 
              onClick={handleGenerate}
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500"
            >
              Generate DFA & Graph
            </button>
          </div>
        </div>
        
        {error && (
            <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-8" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        )}
        
        {result && (
          <div className="space-y-8">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-cyan-400 mb-4 border-b-2 border-gray-700 pb-2">Processing Details</h2>
                <div className="space-y-2 text-lg">
                    <p><strong className="text-gray-400">Processed RE:</strong> <code className="bg-gray-700 text-green-300 px-2 py-1 rounded">{result.processedRegex}</code></p>
                    <p><strong className="text-gray-400">Postfix:</strong> <code className="bg-gray-700 text-yellow-300 px-2 py-1 rounded">{result.postfix}</code></p>
                </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4 border-b-2 border-gray-700 pb-2">DFA Graphs</h2>
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="min-h-[400px] w-full rounded-lg bg-black/50 relative border border-gray-700">
                     <h3 className="text-xl font-semibold text-gray-300 mb-3 absolute top-3 left-3 z-10">2D Graph (SVG)</h3>
                     <DfaGraph2D dfa={result.dfa} />
                  </div>
                  <div className="min-h-[400px] w-full rounded-lg bg-black relative border border-gray-700">
                     <h3 className="text-xl font-semibold text-gray-300 mb-3 absolute top-3 left-3 z-10">3D Graph</h3>
                     <DfaGraph3D dfa={result.dfa} />
                  </div>
               </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-cyan-400 mb-4 border-b-2 border-gray-700 pb-2">DFA Transition Table</h2>
                <div className="mb-4">
                    <p>Start State: <span className="text-green-400 font-bold">q{result.dfa.startState.id}</span></p>
                    <p>Final States: <span className="text-red-400 font-bold">{`{${result.dfa.finalStates.map(s => `q${s.id}`).join(', ')}}`}</span></p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-center table-fixed">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="p-3 border-r border-gray-600">State</th>
                                {[...result.alphabet].map(char => (
                                    <th key={char} className="p-3 border-r border-gray-600">Input '{char}'</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {result.dfa.states.sort((a, b) => a.id - b.id).map(state => (
                                <tr key={state.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                                    <td className={`p-3 border-r border-gray-600 font-bold ${state.isFinal ? 'text-red-400' : ''}`}>
                                        {state.isStart && "→ "}{state.isFinal && "*" }q{state.id}
                                    </td>
                                    {[...result.alphabet].map(char => {
                                        const targetState = state.transitions.get(char);
                                        return (
                                            <td key={char} className="p-3 border-r border-gray-600">
                                                {targetState ? `q${targetState.id}` : "—"}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default RegexToDfaConverter;
