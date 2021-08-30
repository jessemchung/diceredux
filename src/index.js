import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { Suspense, useMemo, useState, useEffect } from 'react'
import './styles.css'

import DiceSelection from './DiceSelection.js'
import DiceOverview from './DiceOverview.js'



ReactDOM.render(
  <>
  <DiceOverview />
  </>,
  document.getElementById('app')
);
