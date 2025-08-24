# Network Topology Generator and Simulator

A comprehensive solution for the Cisco VIP 2025 Networking Challenge.

## Features

- **Automatic Topology Generation**: Creates network topology from router configuration files
- **Network Validation**: Identifies configuration issues and provides recommendations
- **Network Simulation**: Real-time simulation with multithreading and fault injection
- **Interactive Web Interface**: Professional dashboard for network analysis
- **Load Balancing Analysis**: Traffic optimization recommendations
- **Protocol Recommendations**: OSPF vs BGP suggestions based on network size

## Installation

```bash
pip install -r requirements.txt
```

## Usage

### Command Line Interface
```bash
python network_topology_analyzer.py --config-dir test_configs --simulate --duration 10
```

### Web Interface
Open the generated web application in your browser for interactive analysis.

## Configuration Files

Place Cisco router configuration files in the specified directory:
- Supported formats: .cfg, .conf, .txt, .dump
- Automatic parsing of interfaces, VLANs, routing protocols

## Output

The tool generates:
- Network topology diagrams
- Configuration validation reports
- Simulation statistics
- Optimization recommendations
- Interactive web dashboard

## Architecture

- **Multithreaded Simulation**: Each device runs in its own thread
- **IPC Communication**: Message queues for packet exchange
- **Real-time Statistics**: Comprehensive monitoring and logging
- **Fault Injection**: Link failure simulation capabilities

## Examples

See the `test_configs/` directory for sample configuration files.

## Web Application

The included web application provides:
- Interactive topology visualization
- Real-time simulation control
- Configuration analysis
- Issue tracking and recommendations
- Performance monitoring

Built with modern web technologies and responsive design.
